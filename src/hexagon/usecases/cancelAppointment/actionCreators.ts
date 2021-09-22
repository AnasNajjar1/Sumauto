import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    CancelAppointmentPending: () => createAction('cancelAppointment/PENDING'),
    CancelAppointmentFailed: () => createAction('cancelAppointment/FAILED'),
    CancelAppointmentSucceed: () => createAction('cancelAppointment/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
