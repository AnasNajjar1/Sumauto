import React, { FunctionComponent } from 'react';
import { FormGroup, Input, Label, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'autobiz-translate';
import { getFormSelector } from '../../view-models-generators/formSelectors';
import { TReferentialItem } from '../../../../hexagon/interfaces';
import { setVehicleValueCascade } from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';

type ReferentialInputProps = {
    scope: TReferentialItem;
    label: string;
};

export const ReferentialSelect: FunctionComponent<ReferentialInputProps> = ({ label, scope }) => {
    const { referential, vehicle, vehicleName } = useSelector(getFormSelector);
    const dispatch = useDispatch();

    const { data, status } = referential[scope];

    let list = [];

    if (data.length > 0 && scope === 'make') {
        list = [...data[0].preferred, ...data[0].others]; // TODO Fix this
    } else {
        list = data;
    }

    const handleChange = (field: TReferentialItem, value: string) => {
        dispatch(setVehicleValueCascade(field, value));
    };

    const value = vehicle[scope];
    const name = vehicleName[scope];

    let valid: boolean | undefined;
    if (value) valid = true;
    if (status === 'failed') valid = false;
    return (
        <FormGroup className={`form-group-${scope}`}>
            <Label for={scope}>
                {(label && t(label)) || '\u00A0'} {status === 'pending' && <Spinner size="sm" />}
            </Label>
            <InputWithValidation>
                {(name && <Input disabled value={name} />) || (
                    <select
                        className="form-control"
                        name={scope}
                        id={scope}
                        value={value}
                        onChange={(e) => handleChange(scope, e.target.value)}
                        disabled={status !== 'succeeded'}
                    >
                        <option value="">--</option>
                        {list.map((m: any) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                )}
                <InputValidation valid={valid} />
            </InputWithValidation>
        </FormGroup>
    );
};
