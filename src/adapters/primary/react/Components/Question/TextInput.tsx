import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { QuestionKey } from '../../../../../hexagon/interfaces';
import { setVehicleValue } from '../../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { Incitation } from './Incitation';

type TextInputProps = {
    id: QuestionKey;
    type: 'text' | 'email' | 'tel';
    value: string;
    text?: {
        label?: string;
        placeholder?: string;
        help?: string;
    };
    error: any;
    required: boolean;
};

export const TextInput: FunctionComponent<TextInputProps> = ({
    id,
    value,
    text,
    type,
    error,
    required,
}) => {
    const dispatch = useDispatch();
    return (
        <div className="question question-mileage">
            <FormGroup>
                <Label className="label-text" for="label-text">
                    {text?.label} {required && <>*</>}
                </Label>
                <div className="input-with-validation">
                    <Input
                        type={type}
                        className="form-control"
                        name={id}
                        key={id}
                        id={id}
                        defaultValue={value}
                        onBlur={(e) => dispatch(setVehicleValue(id, e.target.value))}
                    />
                    <div className="input-validation">
                        {error?.validation === false && value && <FontAwesomeIcon icon={faCheck} />}
                        {error?.validation === true && <FontAwesomeIcon icon={faTimes} />}
                    </div>
                </div>
                {error?.validation && <p className="text-danger">{error.message}</p>}
            </FormGroup>
        </div>
    );
};
