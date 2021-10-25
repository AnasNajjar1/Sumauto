import React, { useState } from 'react';
import { FormGroup, Input, Label, Spinner, Tooltip } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { getFormSelector } from '../../view-models-generators/formSelectors';
import { TReferentialItem, TRefrentialElement } from '../../../../hexagon/interfaces';
import { setVehicleValueCascade } from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import useTranslation from '../hooks/useTranslation';

type ReferentialInputProps = {
    scope: TReferentialItem;
    label: string;
    tooltip?: string;
    error?: boolean;
};

export const ReferentialSelect: React.FC<ReferentialInputProps> = ({
    label,
    scope,
    tooltip,
    error,
}) => {
    const { referential, vehicle, vehicleName } = useSelector(getFormSelector);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    const { data, status } = referential[scope];

    let list = [];

    if (data.length > 0 && scope === 'make') {
        list = data.all; // TODO Fix this
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
    if (error && !value) valid = false;

    return (
        <FormGroup className={`form-group-${scope}`} id={`form_group_${scope}`}>
            <Label for={scope}>
                {(label && t(label)) || '\u00A0'} {/* \u00A0 specific for empty labels */}
                {tooltip && (
                    <span className="mobile-help">
                        <span role="button" id={`tootltip_${scope}`}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </span>
                        <Tooltip
                            placement="bottom"
                            isOpen={tooltipOpen}
                            target={`tootltip_${scope}`}
                            toggle={toggle}
                        >
                            {tooltip}
                        </Tooltip>
                    </span>
                )}
                {status === 'pending' && <Spinner size="sm" />}
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
                        <option value="">{t('choose')}</option>
                        {list.map((m: TRefrentialElement) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                        {scope === 'engine' && <option value="0">{t('i_dont_know')}</option>}
                    </select>
                )}
                <InputValidation valid={valid} />
            </InputWithValidation>
        </FormGroup>
    );
};
