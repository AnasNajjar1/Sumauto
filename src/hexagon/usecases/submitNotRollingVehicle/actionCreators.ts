import { ActionsUnion, createAction } from '../../../redux/customActions';

export const Actions = {
    submitNotRollingVehicleSaving: () => createAction('notRolling/fetching/PENDING'),
    submitNotRollingVehicleFailed: () => createAction('notRolling/fetching/FAILED'),
    submitNotRollingVehicleSaved: () => createAction('notRolling/fetching/SUCCESS'),
};

export type ActionsType = ActionsUnion<typeof Actions>;
