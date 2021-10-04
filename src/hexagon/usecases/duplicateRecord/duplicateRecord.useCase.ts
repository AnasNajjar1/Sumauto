import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import { dislayErrorUseCase } from '../displayError/displayError.useCase';
import * as actionCreators from './actionCreators';

export const duplicateRecordUseCase =
    (recordUid: string): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.recordFetching());
        const { config } = getState().client;
        const result = await recordGateway.duplicateRecord(config.identifier, recordUid);

        if (isRight(result)) {
            await recordGateway.createQuotation(config.identifier, result.right.uid);
            dispatch(actionCreators.Actions.recordRetrieved(result.right.uid));
        } else {
            dispatch(actionCreators.Actions.recordFailed());
            dispatch(dislayErrorUseCase('duplication_failed'));
        }
    };
