import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { ReferentialGateway } from '../../gateways/referentialGateway.interface';
import { TReferentialItem } from '../../interfaces';
import * as actionCreators from './actionCreators';

const { Actions } = actionCreators;

export const setVehicleValue =
    (key: TReferentialItem, value: string): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        dispatch(Actions.setFilter({ key, value }));

        const { cascade, filter } = getState().referential;

        const { config } = getState().client;

        const i = cascade.findIndex((s) => s === key);
        let nextKey: TReferentialItem | undefined;

        if (cascade[i + 1]) {
            nextKey = cascade[i + 1];
        }

        let reset = false;
        cascade.forEach((element) => {
            if (reset) {
                dispatch(actionCreators.Actions.setFilter({ key: element, value: '' }));
                dispatch(actionCreators.Actions.listReset(element));
            }
            if (!reset && element === key) reset = true;
        });

        if (nextKey) {
            const result = await referentialGateway.requestList(config.identifier, nextKey, filter);

            // TODO: mapper here ?
            if (isRight(result)) {
                dispatch(actionCreators.Actions.listRetrieved(nextKey, result.right));

                if (result.right.length === 1) {
                    dispatch(setVehicleValue(nextKey, result.right[0].id.toString()));
                }
            } else {
                dispatch(actionCreators.Actions.listFailed(nextKey));
            }
        }
    };

export const setCascade =
    (cascade: TReferentialItem[]): ThunkResult<void> =>
    async (dispatch) => {
        dispatch(Actions.setCascade(cascade));
    };
