import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Input, Label } from 'reactstrap';
import { QuestionKey, ReferentialItem } from '../../../../../hexagon/interfaces';
import { isMandatoryQuestion } from '../../../../../hexagon/shared/utils/config';
import { setVehicleValue } from '../../../../../hexagon/usecases/setVehicleValue/setVehicleValue';

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
};

export const TextInput: FunctionComponent<TextInputProps> = ({ id, value, text, type, error }) => {
    const dispatch = useDispatch();

    return (
        <div className="question question-mileage">
            <FormGroup>
                <Label className="label-text" for="label-text">
                    {text?.label} {isMandatoryQuestion(id) && <>*</>}
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
                        {error?.validation === false && <span className="valid">✓</span>}
                        {error?.validation === true && <span className="invalid">✗</span>}
                    </div>
                </div>
                {error?.validation && <p className="text-danger">{error.message}</p>}
            </FormGroup>
        </div>
    );
};
