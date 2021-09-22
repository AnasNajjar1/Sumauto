import { configureStore } from './configureStore';

import { HttpReferentialGateway } from '../adapters/secondary/gateways/autobizApi/httpReferentialGateway';
import { InMemoryReferentialGateway } from '../adapters/secondary/gateways/inMemory/inMemoryReferentialGateway';
import { inMemoryReferential } from '../adapters/secondary/gateways/inMemory/stubs/referential';

import { someDealers } from '../adapters/secondary/gateways/inMemory/stubs/someDealers';
import { someDealerSlots } from '../adapters/secondary/gateways/inMemory/stubs/someDealerSlots';
import { InMemoryRecordGateway } from '../adapters/secondary/gateways/inMemory/inMemoryRecordGateway';
import {
    aRecordIds,
    somesRecords,
} from '../adapters/secondary/gateways/inMemory/stubs/someRecords';
import { HttpRecordGateway } from '../adapters/secondary/gateways/autobizApi/httpRecordGateway';

import { InMemoryClientConfigGateway } from '../adapters/secondary/gateways/inMemory/inMemoryClientConfigGateway';
import { InMemoryDealerGateway } from '../adapters/secondary/gateways/inMemory/inMemoryDealerGateway';
import { InMemoryTrackerGateway } from '../adapters/secondary/gateways/inMemory/inMemoryTrackerGateway';
import { HttpDealerGateway } from '../adapters/secondary/gateways/autobizApi/httpDealerGateway';
import { HttpTrackerGateway } from '../adapters/secondary/gateways/autobizApi/httpTrackerGateway';

let referentialGateway;
let dealerGateway;
let recordGateway;
let clientConfigGateway;
let trackerGateway;

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

        trackerGateway = new InMemoryTrackerGateway();
        trackerGateway.feedUnsubcribeWith(true);

        break;

    default:
        referentialGateway = new HttpReferentialGateway();

        dealerGateway = new HttpDealerGateway();
        dealerGateway.feedDealerSlotListWith(someDealerSlots);

        recordGateway = new HttpRecordGateway();
        trackerGateway = new HttpTrackerGateway();

        // configuration file, could be used has a api response in the future
        clientConfigGateway = new InMemoryClientConfigGateway();
        break;
}

const store = configureStore({
    referentialGateway,
    dealerGateway,
    recordGateway,
    clientConfigGateway,
    trackerGateway,
});

export default store;
