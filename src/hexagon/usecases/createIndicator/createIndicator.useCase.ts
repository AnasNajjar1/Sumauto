import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';

export const createIndicatorUseCase =
    (recordUid: string, name: string, value: number): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        const { config } = getState().client;
        const result = await recordGateway.createIndicator(
            config.identifier,
            recordUid,
            name,
            value,
        );

        return result;
    };
