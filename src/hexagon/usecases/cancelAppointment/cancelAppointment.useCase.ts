import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import { getRecordUseCase } from '../getRecord/getRecord.useCase';
import * as actionCreators from './actionCreators';

export const cancelAppointmentUseCase =
    (recordId: string): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.CancelAppointmentPending());
        const { config } = getState().client;
        const result = await recordGateway.cancelAppointment(config.identifier, recordId);

        if (isRight(result)) {
            dispatch(getRecordUseCase(recordId));
            dispatch(actionCreators.Actions.CancelAppointmentSucceed());
        } else {
            dispatch(actionCreators.Actions.CancelAppointmentFailed());
        }
    };
