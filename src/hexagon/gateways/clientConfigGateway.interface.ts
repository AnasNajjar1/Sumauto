import { ApiResponse } from '../infra/ApiResponse';
import { Dealer, Slot, TClient, TClientConfig } from '../interfaces';

export interface ClientConfigGateway {
    getConfig(name: TClient): TClientConfig;
}
