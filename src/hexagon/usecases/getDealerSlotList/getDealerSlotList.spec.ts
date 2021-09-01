import { configureStore, ReduxStore } from '../../../redux/configureStore';
import { getDealerSlotListUseCase } from './getDealerSlotList.useCase';
import { InMemoryDealerGateway } from '../../../adapters/secondary/gateways/inMemory/inMemoryDealerGateway';
import { someDealerSlots } from '../../../adapters/secondary/gateways/inMemory/stubs/someDealerSlots';

describe('Dealer Slots retrieval', () => {
    let store: ReduxStore;
    let dealerGateway: InMemoryDealerGateway;

    beforeEach(() => {
        dealerGateway = new InMemoryDealerGateway();
        store = configureStore({ dealerGateway });
    });

    it('track the dealer slot list retrieval process', async () => {
        const unsubscribe = store.subscribe(() => {
            expect(store.getState().dealer.dealerSlotList).toEqual({
                status: 'pending',
                data: [],
            });
            unsubscribe();
        });

        await store.dispatch(getDealerSlotListUseCase('1'));
    });

    describe('No dealer Slot exist', () => {
        it('should not retrieve any slots', async () => {
            await store.dispatch(getDealerSlotListUseCase('1'));
            expect(store.getState().dealer.dealerSlotList).toEqual({
                status: 'succeeded',
                data: [],
            });
        });
    });

    describe('Some slots exist', () => {
        beforeEach(() => {
            dealerGateway.feedDealerSlotListWith(someDealerSlots);
        });

        it('should retrieve them', async () => {
            await store.dispatch(getDealerSlotListUseCase('75001'));
            expect(store.getState().dealer.dealerSlotList).toEqual({
                status: 'succeeded',
                data: someDealerSlots,
            });
        });
    });
});
