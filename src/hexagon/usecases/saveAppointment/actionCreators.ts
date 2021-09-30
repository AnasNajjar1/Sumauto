import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    SaveAppointmentPending: () => createAction('saveAppointment/PENDING'),
    SaveAppointmentFailed: () => createAction('saveAppointment/FAILED'),
    SaveAppointmentSucceed: () => createAction('saveAppointment/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
