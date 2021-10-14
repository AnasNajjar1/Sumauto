/*eslint-disable */
import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import { TSubscription } from '../../../../hexagon/interfaces';
import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { TrackerGateway } from '../../../../hexagon/gateways/trackerGateway.interface';

export class HttpTrackerGateway extends BaseApi implements TrackerGateway {

    async requestUnsubscribe(subscription: TSubscription): Promise<ApiResponse<boolean>> {

        try {
            const response = await this.post(`/unsubscribe`, subscription);
            if (response.data.status) {
                return right(true);
            }
            else{
                return left("error");
            }
        } catch (error) {
            return left(error as string);
        }


    }
}
