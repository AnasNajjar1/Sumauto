import { ClientConfigGateway } from '../hexagon/gateways/clientConfigGateway.interface';
import { DealerGateway } from '../hexagon/gateways/dealerGateway.interface';
import { RecordGateway } from '../hexagon/gateways/recordGateway.interface';
import { ReferentialGateway } from '../hexagon/gateways/referentialGateway.interface';

export interface Dependencies {
    referentialGateway: ReferentialGateway;
    dealerGateway: DealerGateway;
    recordGateway: RecordGateway;
    clientConfigGateway: ClientConfigGateway;
}
