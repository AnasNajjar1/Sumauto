import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Label, Input, Col, FormText, Spinner } from 'reactstrap';
import { ReferentialItem } from '../../../../../hexagon/interfaces';
import { setVehicleValueCascade } from '../../../../../hexagon/usecases/setVehicleValue/setVehicleValue';

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
};

export const ReferentialInput: FunctionComponent<ReferentialInputProps> = ({
    text,
    id,
    list,
    value,
    error,
    required,
}) => {
    const dispatch = useDispatch();
    const handleChange = (e: ReferentialItem, name: string) => {
        dispatch(setVehicleValueCascade(e, name));
    };

    return (
        <>
            <div className={`question question-${id}`}>
                <FormGroup>
                    <Label
                        className={`label-${id} ${list.status === 'failed' ? 'text-danger' : ''}`}
                        for={id}
                    >
                        {text.label} {required && '*'}
                        {list?.status === 'loading' && <Spinner size="sm" />}
                    </Label>
                    <div className="input-with-validation">
                        <Input
                            type="select"
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
                                <span className="valid">✓</span>
                            )}
                            {value && error?.validation === true && (
                                <span className="invalid">✗</span>
                            )}
                        </div>
                    </div>
                    {value && error?.validation && <p className="text-danger">{error.message}</p>}
                    {text.help && <FormText color="muted">{text.help}</FormText>}
                </FormGroup>
            </div>
        </>
    );
};
