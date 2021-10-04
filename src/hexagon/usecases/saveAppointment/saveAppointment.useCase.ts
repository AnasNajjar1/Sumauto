import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import { dislayErrorUseCase } from '../displayError/displayError.useCase';
import { getRecordUseCase } from '../getRecord/getRecord.useCase';
import * as actionCreators from './actionCreators';

export const saveAppointmentUseCase =
    (recordUid: string, hour: string): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.SaveAppointmentPending());
        const { config } = getState().client;
        const result = await recordGateway.createAppointment(
            config.identifier,
            recordUid,
            Number(hour),
        );

        if (isRight(result)) {
            await dispatch(getRecordUseCase(recordUid, 'full'));
            dispatch(actionCreators.Actions.SaveAppointmentSucceed());
        } else {
            dispatch(actionCreators.Actions.SaveAppointmentFailed());
            dispatch(dislayErrorUseCase('create_appointment_failed'));
        }
    };
