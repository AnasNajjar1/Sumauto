import { TClient, TClientConfig } from '../../../../hexagon/interfaces';
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
