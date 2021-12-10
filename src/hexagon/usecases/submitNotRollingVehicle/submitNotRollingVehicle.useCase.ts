import { isLeft, isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import { dislayErrorUseCase } from '../displayError/displayError.useCase';
import * as actionCreators from './actionCreators';

export const submitNotRollingVehicleUseCase =
    (phone: string): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.submitNotRollingVehicleSaving());
        const { record } = getState();
        const { config } = getState().client;

        const resultUpdateParticular = await recordGateway.updateUserInformation(
            config.identifier,
            record.uid,
            {
                email: record.data.customer.email,
                phone,
                phone2: phone,
                zipCode: record.data.customer.zipCode,
            },
        );

        if (isLeft(resultUpdateParticular)) {
            dispatch(actionCreators.Actions.submitNotRollingVehicleFailed());
            dispatch(dislayErrorUseCase('update_particular_failed'));
        } else {
            const resultUpdateNotRolling = await recordGateway.updateNotRollingProject(
                config.identifier,
                record.uid,
            );

            if (isRight(resultUpdateNotRolling)) {
                dispatch(actionCreators.Actions.submitNotRollingVehicleSaved());
            } else {
                dispatch(actionCreators.Actions.submitNotRollingVehicleFailed());
                dispatch(dislayErrorUseCase('update_not_rolling_failed'));
            }
        }
    };
