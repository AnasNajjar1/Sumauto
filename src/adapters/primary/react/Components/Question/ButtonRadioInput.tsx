import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Label, FormText, ButtonGroup, Button } from 'reactstrap';
import { t } from 'autobiz-translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReferentialItem } from '../../../../../hexagon/interfaces';
import { setVehicleValue } from '../../../../../hexagon/usecases/setVehicleValue/setVehicleValue';

type Data = {
    name: 'string';
    value: 'string';
};
type ButtonRadioInputProps = {
    text: {
        label: string;
        placeholder?: string;
        help?: string;
    };
    grid?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
    };
    id: ReferentialItem;
    data: Data[];
    value: string;
    error: any;
    required: boolean;
};

export const ButtonRadioInput: FunctionComponent<ButtonRadioInputProps> = ({
    text,
    id,
    data,
    value,
    error,
    required,
}) => {
    const dispatch = useDispatch();

    return (
        <div className={`question question-${id}`}>
            <FormGroup>
                <Label className={`label-${id}`} for={id}>
                    {t(text.label)} {required && '*'}
                </Label>
                <div className="input-with-validation">
                    <ButtonGroup>
                        {data.map((d) => (
                            <Button
                                key={d.value}
                                color={value === d.value ? 'primary' : 'secondary'}
                                onClick={() => dispatch(setVehicleValue(id, d.value))}
                            >
                                {t(d.name)}
                            </Button>
                        ))}
                    </ButtonGroup>
                    <div className="input-validation">
                        {value && error?.validation === false && <FontAwesomeIcon icon={faCheck} />}
                        {value && error?.validation === true && <FontAwesomeIcon icon={faTimes} />}
                    </div>
                </div>
                {value && error?.validation && <p className="text-danger">{error.message}</p>}
                {text.help && <FormText color="muted">{text.help}</FormText>}
            </FormGroup>
        </div>
    );
};
