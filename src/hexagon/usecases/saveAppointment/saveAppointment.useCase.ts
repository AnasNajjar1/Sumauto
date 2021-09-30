import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import { dislayErrorUseCase } from '../displayError/displayError.useCase';
import * as actionCreators from './actionCreators';

export const saveAppointmentUseCase =
    (recordId: string, hour: string): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.SaveAppointmentPending());
        const { config } = getState().client;
        const result = await recordGateway.createAppointment(
            config.identifier,
            Number(recordId),
            Number(hour),
        );

        if (isRight(result)) {
            dispatch(actionCreators.Actions.SaveAppointmentSucceed());
        } else {
            dispatch(actionCreators.Actions.SaveAppointmentFailed());
            dispatch(dislayErrorUseCase('create_appointment_failed'));
        }
    };
