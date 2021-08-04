import { configureStore } from './configureStore';

import { HttpReferentialGateway } from '../adapters/secondary/gateways/autobizApi/httpReferentialGateway';
import { InMemoryReferentialGateway } from '../adapters/secondary/gateways/inMemory/inMemoryReferentialGateway';
import { inMemoryReferential } from '../adapters/secondary/gateways/inMemory/stubs/referential';
import { InMemoryDealerGateway } from '../adapters/secondary/gateways/inMemory/inMemoryDealerGateway';
import { someDealers } from '../adapters/secondary/gateways/inMemory/stubs/someDealers';
import { someDealerSlots } from '../adapters/secondary/gateways/inMemory/stubs/someDealerSlots';
import { InMemoryRecordGateway } from '../adapters/secondary/gateways/inMemory/inMemoryRecordGateway';
import { aRecordIds } from '../adapters/secondary/gateways/inMemory/stubs/aRecord';

let referentialGateway;
let dealerGateway;
let recordGateway;

switch (process.env.REACT_APP_SOURCE) {
    case 'inMemory':
        referentialGateway = new InMemoryReferentialGateway();
        referentialGateway.feedWith(inMemoryReferential);

        dealerGateway = new InMemoryDealerGateway();
        dealerGateway.feedDealerListWith(someDealers);
        dealerGateway.feedDealerSlotListWith(someDealerSlots);

        recordGateway = new InMemoryRecordGateway();
        recordGateway.feedWith(aRecordIds);
        break;

    default:
        referentialGateway = new HttpReferentialGateway();

        dealerGateway = new InMemoryDealerGateway();
        dealerGateway.feedDealerListWith(someDealers);
        dealerGateway.feedDealerSlotListWith(someDealerSlots);

        recordGateway = new InMemoryRecordGateway();
        recordGateway.feedWith(aRecordIds);
        break;
}

const store = configureStore({
    referentialGateway,
    dealerGateway,
    recordGateway,
});

export default store;
