import { ActionsUnion, createAction } from '../../../redux/customActions';
import { RecordIds } from '../../interfaces';

export const Actions = {
    saveVehicleAndUserInformationsSaving: () => createAction('record/SAVING'),
    saveVehicleAndUserInformationsFailed: () => createAction('record/FAILED'),
    saveVehicleAndUserInformationsSaved: (recordIds: RecordIds) =>
        createAction('record/SAVED', recordIds),
};

export type ActionsType = ActionsUnion<typeof Actions>;
