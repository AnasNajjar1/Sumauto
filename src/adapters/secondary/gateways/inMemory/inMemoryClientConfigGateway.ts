import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import { Dealer, Slot, TClient, TClientConfig } from '../../../../hexagon/interfaces';
import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { DealerGateway } from '../../../../hexagon/gateways/dealerGateway.interface';
import { ClientConfigGateway } from '../../../../hexagon/gateways/clientConfigGateway.interface';

import autocasion from '../../../../config/autocasion';
import autoscout24 from '../../../../config/autoscout24';
import unoauto from '../../../../config/unoauto';

export class InMemoryClientConfigGateway implements ClientConfigGateway {
    getConfig(name: TClient): TClientConfig {
        if (name === 'autocasion') return autocasion;
        if (name === 'autoscout24') return autoscout24;
        if (name === 'unoauto') return unoauto;
        return autocasion;
    }
}
