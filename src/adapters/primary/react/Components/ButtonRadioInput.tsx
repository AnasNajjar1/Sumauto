import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Label, ButtonGroup, Button, Tooltip } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faQuestionCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TVehicleStateItem } from '../../../../hexagon/interfaces';
import { setVehicleStateValue } from '../../../../hexagon/usecases/setVehicleStateValue/setVehicleStateValue.useCase';
import { getFormSelector } from '../../view-models-generators/formSelectors';
import useTranslation from '../hooks/useTranslation';

type Data = {
    name: string;
    value: string;
};
type ButtonRadioInputProps = {
    label: string;
    id: TVehicleStateItem;
    data: Data[];
    tooltip?: string;
    error?: boolean;
};

export const ButtonRadioInput: React.FC<ButtonRadioInputProps> = ({
    label,
    id,
    data,
    tooltip,
    error,
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { vehicleState } = useSelector(getFormSelector);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
        <FormGroup className={`form-group-${id}`} id={`form_group_${id}`}>
            <Label className={`label-${id}`} htmlFor={id}>
                {t(label)}

                {tooltip && (
                    <span className="mobile-help">
                        <span role="button" id={`tootltip_${id}`}>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </span>
                        <Tooltip
                            placement="bottom"
                            isOpen={tooltipOpen}
                            target={`tootltip_${id}`}
                            toggle={toggle}
                        >
                            {tooltip}
                        </Tooltip>
                    </span>
                )}
            </Label>
            <div className="input-with-validation">
                <ButtonGroup>
                    {data.map((d) => (
                        <Button
                            key={d.value}
                            color="light"
                            className={vehicleState[id] === d.value ? 'selected' : 'non-selected'}
                            onClick={() => dispatch(setVehicleStateValue(id, d.value))}
                        >
                            {t(d.name)}
                        </Button>
                    ))}
                </ButtonGroup>
                <div className="input-validation">
                    {vehicleState[id] && <FontAwesomeIcon icon={faCheck} />}
                    {error && !vehicleState[id] && <FontAwesomeIcon icon={faTimes} />}
                </div>
            </div>
        </FormGroup>
    );
};
