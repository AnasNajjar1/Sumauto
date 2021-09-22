import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import { getRecordUseCase } from '../getRecord/getRecord.useCase';
import * as actionCreators from './actionCreators';

export const duplicateRecordUseCase =
    (recordId: string): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.recordFetching());
        const { config } = getState().client;
        const result = await recordGateway.duplicateRecord(config.identifier, recordId);

        if (isRight(result)) {
            dispatch(actionCreators.Actions.recordRetrieved(result.right));
            // dispatch(getRecordUseCase(result.right.toString()));
        } else {
            dispatch(actionCreators.Actions.recordFailed());
        }
    };
