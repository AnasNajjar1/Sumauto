import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Label, ButtonGroup, Button } from 'reactstrap';
import { t } from 'autobiz-translate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faQuestionCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TVehicleStateItem } from '../../../../hexagon/interfaces';
import { setVehicleStateValue } from '../../../../hexagon/usecases/setVehicleStateValue/setVehicleStateValue.useCase';
import { getFormSelector } from '../../view-models-generators/formSelectors';

type Data = {
    name: string;
    value: string;
};
type ButtonRadioInputProps = {
    label: string;
    id: TVehicleStateItem;
    data: Data[];
    tooltip?: boolean;
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
    const { vehicleState } = useSelector(getFormSelector);

    return (
        <FormGroup className={`form-group-${id}`} id={`form_group_${id}`}>
            <Label className={`label-${id}`} htmlFor={id}>
                {t(label)} {tooltip && <FontAwesomeIcon icon={faQuestionCircle} />}
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
