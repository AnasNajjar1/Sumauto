import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { ReferentialGateway } from '../../gateways/referentialGateway.interface';
import { TReferentialItem } from '../../interfaces';
import * as actionCreators from './actionCreators';

const { Actions } = actionCreators;

export const setVehicleValueCascade =
    (key: TReferentialItem, value: string): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        dispatch(Actions.setVehicle({ key, value }));

        const { cascade, vehicle } = getState().form;
        const { config } = getState().client;
        const i = cascade.findIndex((s) => s === key);

        if (i === -1) {
            return;
        }

        let nextKey: TReferentialItem | undefined;

        if (cascade[i + 1]) {
            nextKey = cascade[i + 1];
        }

        let reset = false;
        cascade.forEach((element) => {
            if (reset) {
                dispatch(actionCreators.Actions.setVehicle({ key: element, value: '' }));
                dispatch(actionCreators.Actions.listReset(element));
            }
            if (!reset && element === key) reset = true;
        });

        if (nextKey) {
            dispatch(actionCreators.Actions.listFetching(nextKey));
            const result = await referentialGateway.requestList(
                config.identifier,
                nextKey,
                vehicle,
            );

            if (isRight(result)) {
                dispatch(actionCreators.Actions.listRetrieved(nextKey, result.right));

                if (result.right.length === 1) {
                    dispatch(setVehicleValueCascade(nextKey, result.right[0].id.toString()));
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

export const requestListUseCase =
    (key: TReferentialItem): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        const { config } = getState().client;
        const { vehicle } = getState().form;

        dispatch(actionCreators.Actions.listFetching(key));
        const result = await referentialGateway.requestList(config.identifier, key, vehicle);

        if (isRight(result)) {
            dispatch(actionCreators.Actions.listRetrieved(key, result.right));

            if (result.right.length === 1) {
                dispatch(setVehicleValueCascade(key, result.right[0].id.toString()));
            }
        } else {
            dispatch(actionCreators.Actions.listFailed(key));
        }
    };
