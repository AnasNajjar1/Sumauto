import { ActionsUnion, createAction } from '../../../redux/customActions';
import { TJourney } from '../../interfaces';

export const Actions = {
    setJourneyType: (journeyType: TJourney) =>
        createAction('client/SET_JOURNEY_TYPE', { journeyType }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
