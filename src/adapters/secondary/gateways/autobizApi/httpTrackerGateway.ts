/*eslint-disable */
import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import { TSubscription } from '../../../../hexagon/interfaces';
import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { TrackerGateway } from '../../../../hexagon/gateways/trackerGateway.interface';

export class HttpTrackerGateway extends BaseApi implements TrackerGateway {
    private inMemoryUnsubcribeSuccess = true;

    async requestUnsubscribe(subscription: TSubscription): Promise<ApiResponse<boolean>> {
        return left('error');
    }
}
