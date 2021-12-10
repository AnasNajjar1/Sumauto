import { ActionsUnion, createAction } from '../../../redux/customActions';
import { TDeviceType } from '../../interfaces';

export const Actions = {
    setClientDeviceType: (deviceType: TDeviceType) =>
        createAction('client/SET_DEVICE_TYPE', { deviceType }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
