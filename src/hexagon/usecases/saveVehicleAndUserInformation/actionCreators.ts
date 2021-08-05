import { ActionsUnion, createAction } from '../../../redux/customActions';
import { RecordIds } from '../../interfaces';

export const Actions = {
    saveVehicleAndUserInformationsSaving: () => createAction('record/saving/PENDING'),
    saveVehicleAndUserInformationsFailed: () => createAction('record/saving/FAILED'),
    saveVehicleAndUserInformationsSaved: (recordIds: RecordIds) =>
        createAction('record/saving/SUCCESS', recordIds),
};

export type ActionsType = ActionsUnion<typeof Actions>;
