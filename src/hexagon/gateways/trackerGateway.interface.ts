import { ApiResponse } from '../infra/ApiResponse';
import { TSubscription } from '../interfaces';

export interface TrackerGateway {
    requestUnsubscribe(subscription: TSubscription): Promise<ApiResponse<boolean>>;
}
