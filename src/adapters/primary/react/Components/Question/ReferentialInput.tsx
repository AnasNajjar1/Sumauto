import React, { FunctionComponent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Label, Input, FormText, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReferentialItem } from '../../../../../hexagon/interfaces';
import { setVehicleValueCascade } from '../../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { Encouragement } from './Encouragement';

type ReferentialInputProps = {
    text: {
        label?: string;
        placeholder?: string;
        help?: string;
    };
    id: ReferentialItem;
    list: any;
    value: string;
    error: any;
    required: boolean;
    encouragement?: {
        title: string;
        body: string;
    };
};

export const ReferentialInput: FunctionComponent<ReferentialInputProps> = ({
    text,
    id,
    list,
    value,
    error,
    encouragement,
}) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const handleChange = (e: ReferentialItem, name: string) => {
        dispatch(setVehicleValueCascade(e, name));
    };

    return (
        <>
            <div className={`question question-${id}`}>
                <FormGroup>
                    <Label
                        className={`label-${id} ${list.status === 'failed' ? 'text-danger' : ''}`}
                        htmlFor={id}
                    >
                        {text.label}
                        {list?.status === 'pending' && <Spinner size="sm" />}
                    </Label>
                    <div className="input-with-validation">
                        <Input
                            type="select"
                            innerRef={inputRef}
                            className="form-control"
                            name={id}
                            id={id}
                            value={value}
                            onChange={(e) => handleChange(id, e.target.value)}
                            disabled={list?.status !== 'succeeded'}
                        >
                            <option value="">{text.placeholder}</option>
                            {list?.data &&
                                list.data.map((e: any) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                        </Input>
                        <div className="input-validation">
                            {value && error?.validation === false && (
                                <FontAwesomeIcon icon={faCheck} />
                            )}
                            {value && error?.validation === true && (
                                <FontAwesomeIcon icon={faTimes} />
                            )}
                        </div>
                    </div>
                    {value && error?.validation && <p className="text-danger">{error.message}</p>}
                    {text.help && <FormText color="muted">{text.help}</FormText>}
                    {encouragement && (
                        <Encouragement
                            id={id}
                            title={encouragement.title}
                            body={encouragement.body}
                        />
                    )}
                </FormGroup>
            </div>
        </>
    );
};
