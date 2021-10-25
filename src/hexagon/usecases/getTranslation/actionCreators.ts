import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    translationFetching: () => createAction('translation/PENDING'),
    translationFailed: () => createAction('translation/FAILED'),
    translationRetrieved: (translation: any) =>
        createAction('translation/SUCCESS', { translation }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
