import { isRight } from 'fp-ts/lib/Either';
import { ReferentialMapper } from '../../../adapters/secondary/gateways/autobizApi/mappers/vehicleFilter.mapper';
import { ThunkResult } from '../../../redux/configureStore';
import { ReferentialGateway } from '../../gateways/referentialGateway.interface';
import { QuestionKey, ReferentialItem } from '../../interfaces';
import * as actionCreators from './actionCreators';

const { Actions } = actionCreators;

export const setVehicleValueCascade =
    (key: ReferentialItem, value: string): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        dispatch(Actions.vehicleValueSet({ key, value }));

        const { cascadeOrder } = getState().client.config;

        const i = cascadeOrder.findIndex((s) => s === key);

        let nextKey: ReferentialItem | undefined;
        if (cascadeOrder[i + 1]) {
            nextKey = cascadeOrder[i + 1];
        }

        let reset = false;
        cascadeOrder.forEach((element) => {
            if (reset) {
                dispatch(
                    Actions.vehicleValueSet({
                        key: element,
                        value: '',
                    }),
                );
                dispatch(Actions.listReset(element));
            }
            if (!reset && element === key) reset = true;
        });

        if (value && nextKey) {
            dispatch(Actions.listFetching(nextKey));

            const { identifier } = getState().client.config;
            const result = await referentialGateway.requestList(
                identifier,
                nextKey,
                ReferentialMapper.toFilters(getState().form.vehicle),
            );

            if (isRight(result)) {
                dispatch(Actions.listRetrieved(nextKey, result.right));
                if (result.right.length === 1 && nextKey) {
                    dispatch(setVehicleValueCascade(nextKey, result.right[0].id.toString()));
                }
            } else {
                dispatch(Actions.listFailed(nextKey));
            }
        } else {
            dispatch(Actions.listReset(nextKey));
        }
    };

export const setVehicleValue =
    (key: QuestionKey, value: string): ThunkResult<void> =>
    async (dispatch) => {
        dispatch(Actions.vehicleValueSet({ key, value }));
    };
