import { TClientConfig, TClient, TJourney } from '../hexagon/interfaces';

import autocasion from './autocasion';
import autoscout24 from './autoscout24';
import unoauto from './unoauto';

export const getClientConfig = (client: TClient): TClientConfig => {
    if (client === 'autocasion') return autocasion;
    if (client === 'autoscout24') return autoscout24;
    if (client === 'unoauto') return unoauto;
    return autocasion;
};

export const clients: TClient[] = ['unoauto', 'autocasion', 'autoscout24'];

export const journeys: TJourney[] = ['sale', 'valuation'];
