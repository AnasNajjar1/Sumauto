import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import * as actionCreators from './actionCreators';

export const getRecordUseCase =
    (recordUid: string, mode?: string): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.recordFetching());
        const { config } = getState().client;
        const result = await recordGateway.getRecord(config.identifier, recordUid, mode);

        if (isRight(result)) {
            dispatch(actionCreators.Actions.recordRetrieved(result.right));
        } else {
            dispatch(actionCreators.Actions.recordFailed());
        }
    };
