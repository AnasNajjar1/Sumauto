import { TClientConfig, TClient, TJourney, TPurchaseDelay } from '../hexagon/interfaces';

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

export const sellDelay: TPurchaseDelay[] = [
    { name: '1-3_weeks', value: '1' },
    { name: '1_month', value: '2' },
    { name: '3_months', value: '3' },
];
