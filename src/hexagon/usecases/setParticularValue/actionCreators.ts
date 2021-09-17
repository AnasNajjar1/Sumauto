import { ActionsUnion, createAction } from '../../../redux/customActions';
import { FormValue } from '../../interfaces';

export const Actions = {
    setParticular: (formValue: FormValue) => createAction('particular/SET', { formValue }),
};

export type ActionsType = ActionsUnion<typeof Actions>;
