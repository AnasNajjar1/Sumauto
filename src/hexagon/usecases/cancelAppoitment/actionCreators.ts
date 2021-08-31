import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    CancelAppointmentPending: () => createAction('cancelApointment/PENDING'),
    CancelAppointmentFailed: () => createAction('cancelApointment/FAILED'),
    CancelAppointmentSucceed: () => createAction('cancelApointment/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
