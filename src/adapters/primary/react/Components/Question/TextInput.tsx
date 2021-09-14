import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { t } from 'autobiz-translate';

import { QuestionKey } from '../../../../../hexagon/interfaces';
import { setVehicleValue } from '../../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { Encouragement } from './Encouragement';

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
    encouragement?: {
        title: string;
        body: string;
    };
};

export const TextInput: FunctionComponent<TextInputProps> = ({
    id,
    value,
    text,
    type,
    error,
    required,
    encouragement,
}) => {
    const dispatch = useDispatch();
    return (
        <div className={`question question-${id}`}>
            <FormGroup>
                <Label className="label-text" htmlFor="label-text">
                    {text?.label} {required ? <>*</> : <>({t('optional')})</>}
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
                {encouragement && (
                    <Encouragement id={id} title={encouragement.title} body={encouragement.body} />
                )}
            </FormGroup>
        </div>
    );
};
