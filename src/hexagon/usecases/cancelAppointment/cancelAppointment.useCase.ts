import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import { getRecordUseCase } from '../getRecord/getRecord.useCase';
import * as actionCreators from './actionCreators';

export const cancelAppointmentUseCase =
    (recordUid: string): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.CancelAppointmentPending());
        const { config } = getState().client;

        const result = await recordGateway.cancelAppointment(config.identifier, recordUid);

        if (isRight(result)) {
            dispatch(getRecordUseCase(recordUid));
            dispatch(actionCreators.Actions.CancelAppointmentSucceed());
        } else {
            dispatch(actionCreators.Actions.CancelAppointmentFailed());
        }
    };
