import { configureStore, ReduxStore } from '../../../redux/configureStore';
import { InMemoryReferentialGateway } from '../../../adapters/secondary/gateways/inMemory/inMemoryReferentialGateway';
import { AppState } from '../../../redux/appState';
import { getCarDetailsByRegistrationUseCase } from './getCarDetailsByRegistration.useCase';
import { CarDetails } from '../../interfaces/index';

describe('Player point attribution', () => {
    let store: ReduxStore;
    let referentialGateway: InMemoryReferentialGateway;
    let initialState: AppState;

    beforeEach(() => {
        referentialGateway = new InMemoryReferentialGateway();
        // store = configureStore({ referentialGateway });
        initialState = store.getState();
    });

    describe('One current match', () => {
        beforeEach(() => {
            // referentialGateway.feedWith([firstTennisMatch]);
            // store.dispatch(actionCreatorsMatchesRetrieval.Actions.tennisMatchesRetrieved([{
            //         id: '442b351e-e2e1-43f0-9132-bff447b93b77',
            //         players: [
            //             {
            //                 name: 'Nadal',
            //                 ranking: 1
            //             },
            //             {
            //                 name: 'Federer',
            //                 ranking: 2
            //             }
            //         ]
            //     }]
            // ));
        });
        it('should be true when true is true', () => {
            expect(true).toBe(true);
        });

        // it('should start with no given points to either side', () => {
        //     expect(store.getState()).toEqual({
        //         ...initialState,
        //         tennisMatches: store.getState().tennisMatches,
        //         matchesScores: {
        //             '442b351e-e2e1-43f0-9132-bff447b93b77': {
        //                 'Nadal': '0',
        //                 'Federer': '0'
        //             }
        //         }
        //     })
        // });

        // it('should give a point to a player', async () => {
        //     await store.dispatch(giveAPointToPlayer('442b351e-e2e1-43f0-9132-bff447b93b77', 'Nadal'));
        //     expect(store.getState()).toEqual({
        //         ...initialState,
        //         tennisMatches: store.getState().tennisMatches,
        //         matchesScores: {
        //             '442b351e-e2e1-43f0-9132-bff447b93b77': {
        //                 'Nadal': '15',
        //                 'Federer': '0'
        //             }
        //         }
        //     })
        // });
    });

    // describe('Several current matches', () => {

    //     beforeEach(() => {
    //         tennisMatchesGateway.feedWith([firstTennisMatch, secondTennisMatch])
    //         store.dispatch(actionCreatorsMatchesRetrieval.Actions.tennisMatchesRetrieved([
    //             {
    //                 id: '442b351e-e2e1-43f0-9132-bff447b93b77',
    //                 players: [
    //                     {
    //                         name: 'Nadal',
    //                         ranking: 1
    //                     },
    //                     {
    //                         name: 'Federer',
    //                         ranking: 2
    //                     }
    //                 ]
    //             }, {
    //                 id: '882b351e-e2e1-43f0-9132-bff447b93b77',
    //                 players: [
    //                     {
    //                         name: 'Djokovic',
    //                         ranking: 3
    //                     },
    //                     {
    //                         name: 'Gasquet',
    //                         ranking: 4
    //                     }
    //                 ]
    //             }]
    //         ));
    //     });

    //     it('should give a point to a player of each match', async () => {
    //         await store.dispatch(giveAPointToPlayer('442b351e-e2e1-43f0-9132-bff447b93b77', 'Nadal'));
    //         await store.dispatch(giveAPointToPlayer('882b351e-e2e1-43f0-9132-bff447b93b77', 'Djokovic'));
    //         expect(store.getState()).toEqual({
    //             ...initialState,
    //             tennisMatches: store.getState().tennisMatches,
    //             matchesScores: {
    //                 '442b351e-e2e1-43f0-9132-bff447b93b77': {
    //                     'Nadal': '15',
    //                     'Federer': '0'
    //                 },
    //                 '882b351e-e2e1-43f0-9132-bff447b93b77': {
    //                     'Djokovic': '15',
    //                     'Gasquet': '0'
    //                 }
    //             }
    //         })
    //     });

    // });

    // const firstTennisMatch: TennisMatch = {
    //     id: '442b351e-e2e1-43f0-9132-bff447b93b77',
    //     players: [
    //         {
    //             name: 'Nadal',
    //             ranking: 1
    //         },
    //         {
    //             name: 'Federer',
    //             ranking: 2
    //         }
    //     ],
    // };

    // const secondTennisMatch: TennisMatch = {
    //     id: '882b351e-e2e1-43f0-9132-bff447b93b77',
    //     players: [
    //         {
    //             name: 'Djokovic',
    //             ranking: 3
    //         },
    //         {
    //             name: 'Gasquet',
    //             ranking: 4
    //         }
    //     ],
    // };
});
