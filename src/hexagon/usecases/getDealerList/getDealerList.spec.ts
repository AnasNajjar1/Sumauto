import { configureStore, ReduxStore } from '../../../redux/configureStore';
import { getDealerList } from './getDealerList.useCase';
import { InMemoryDealerGateway } from '../../../adapters/secondary/gateways/inMemory/inMemoryDealerGateway';
import { AppState } from '../../../redux/appState';
import { Dealer } from '../../interfaces';

describe('Dealers retrieval', () => {
    let store: ReduxStore;
    let dealerGateway: InMemoryDealerGateway;

    const someDealers: Dealer[] = [
        {
            id: 1,
            dealerId: 1,
            name: 'Dealer A',
            city: 'City A',
            address: 'Address A',
            distance: 1,
        },
        {
            id: 2,
            dealerId: 2,
            name: 'Dealer B',
            city: 'City B',
            address: 'Address B',
            distance: 2,
        },
    ];

    beforeEach(() => {
        dealerGateway = new InMemoryDealerGateway();
        // store = configureStore({ dealerGateway });
    });

    it('track the dealer list retrieval process', async () => {
        const unsubscribe = store.subscribe(() => {
            expect(store.getState().dealer.dealerList).toEqual({
                status: 'pending',
                data: [],
            });
            unsubscribe();
        });
        await store.dispatch(getDealerList('75001'));
    });

    describe('No dealer exist', () => {
        it('should not retrieve any dealers', async () => {
            await store.dispatch(getDealerList('00000'));
            expect(store.getState().dealer.dealerList).toEqual({
                status: 'succeeded',
                data: [],
            });
        });
    });

    describe('Some dealers exist', () => {
        beforeEach(() => {
            dealerGateway.feedDealerListWith(someDealers);
        });

        it('should retrieve them', async () => {
            await store.dispatch(getDealerList('75001'));
            expect(store.getState().dealer.dealerList).toEqual({
                status: 'succeeded',
                data: someDealers,
            });
        });
    });
});
