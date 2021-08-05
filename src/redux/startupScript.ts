import { configureStore } from './configureStore';

import { HttpReferentialGateway } from '../adapters/secondary/gateways/autobizApi/httpReferentialGateway';
import { InMemoryReferentialGateway } from '../adapters/secondary/gateways/inMemory/inMemoryReferentialGateway';
import { inMemoryReferential } from '../adapters/secondary/gateways/inMemory/stubs/referential';
import { InMemoryDealerGateway } from '../adapters/secondary/gateways/inMemory/inMemoryDealerGateway';
import { someDealers } from '../adapters/secondary/gateways/inMemory/stubs/someDealers';
import { someDealerSlots } from '../adapters/secondary/gateways/inMemory/stubs/someDealerSlots';
import { InMemoryRecordGateway } from '../adapters/secondary/gateways/inMemory/inMemoryRecordGateway';
import {
    aRecordIds,
    somesRecords,
} from '../adapters/secondary/gateways/inMemory/stubs/someRecords';
import { InMemoryClientConfigGateway } from '../adapters/secondary/gateways/inMemory/inMemoryClientConfigGateway';

let referentialGateway;
let dealerGateway;
let recordGateway;
let clientConfigGateway;

switch (process.env.REACT_APP_SOURCE) {
    case 'inMemory':
        referentialGateway = new InMemoryReferentialGateway();
        referentialGateway.feedWith(inMemoryReferential);

        dealerGateway = new InMemoryDealerGateway();
        dealerGateway.feedDealerListWith(someDealers);
        dealerGateway.feedDealerSlotListWith(someDealerSlots);

        recordGateway = new InMemoryRecordGateway();
        recordGateway.feedRecordIdsWith(aRecordIds);
        recordGateway.feedRecordsWith(somesRecords);

        clientConfigGateway = new InMemoryClientConfigGateway();
        break;

    default:
        referentialGateway = new HttpReferentialGateway();

        dealerGateway = new InMemoryDealerGateway();
        dealerGateway.feedDealerListWith(someDealers);
        dealerGateway.feedDealerSlotListWith(someDealerSlots);

        recordGateway = new InMemoryRecordGateway();
        recordGateway.feedRecordIdsWith(aRecordIds);
        recordGateway.feedRecordsWith(somesRecords);

        clientConfigGateway = new InMemoryClientConfigGateway();
        break;
}

const store = configureStore({
    referentialGateway,
    dealerGateway,
    recordGateway,
    clientConfigGateway,
});

export default store;
