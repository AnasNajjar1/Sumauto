import React, { FunctionComponent } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'autobiz-translate';
import {
    getMakeListSelector,
    getReferentialSelector,
} from '../../view-models-generators/referentialSelectors';
import { TReferentialItem } from '../../../../hexagon/interfaces';
import { setVehicleValue } from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';

type ReferentialInputProps = {
    scope: TReferentialItem;
    label: string;
};

export const ReferentialSelect: FunctionComponent<ReferentialInputProps> = ({ label, scope }) => {
    const { referential } = useSelector(getReferentialSelector);
    const dispatch = useDispatch();

    const { data, status } = referential[scope];

    const handleChange = (field: TReferentialItem, value: string) => {
        dispatch(setVehicleValue(field, value));
    };

    const value = referential.filter[scope];

    let valid: boolean | undefined;
    if (value) valid = true;
    if (status === 'failed') valid = false;

    return (
        <FormGroup className={`form-group-${scope}`}>
            <Label for={scope}>{label && t(label)}</Label>
            <InputWithValidation>
                <select
                    className="form-control"
                    name={scope}
                    id={scope}
                    value={value}
                    onChange={(e) => handleChange(scope, e.target.value)}
                    disabled={status !== 'succeeded'}
                >
                    <option value="">--</option>
                    {data.map((m: any) => (
                        <option key={m.id} value={m.id}>
                            {m.name}
                        </option>
                    ))}
                </select>
                <InputValidation valid={valid} />
            </InputWithValidation>
        </FormGroup>
    );
};
