import React, { useEffect, useState } from 'react';
import { FormGroup, Input, InputGroup, Label } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import useTranslation from '../hooks/useTranslation';
import { setVehicleStateValue } from '../../../../hexagon/usecases/setVehicleStateValue/setVehicleStateValue.useCase';
import { TVehicleStateItem } from '../../../../hexagon/interfaces';

type SimpleInputProps = {
    label: string;
    id: TVehicleStateItem;
    placeholder?: string;
    inputType: 'text' | 'textarea';
    error: boolean;
};

export const SimpleInput: React.FC<SimpleInputProps> = ({
    label,
    id,
    placeholder,
    inputType,
    error,
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState<string>('');
    const [valid, setValid] = useState<boolean>();

    const handleChange = (value: string) => {
        if (value) setValid(true);
        else setValid(false);
        setInputValue(value);
    };

    useEffect(() => {
        dispatch(setVehicleStateValue(id, inputValue));
    }, [dispatch, inputValue]);

    useEffect(() => {
        if (error) setValid(false);
    }, [dispatch, error]);

    return (
        <FormGroup className={`form-group-${id}`} id={`form_group_${id}`}>
            <Label className={`label-${id}`}>{t(label)}</Label>
            <InputWithValidation>
                <InputGroup>
                    <Input
                        id={id}
                        name={id}
                        type={inputType}
                        placeholder={placeholder && t(placeholder)}
                        onBlur={(e) => handleChange(e.target.value)}
                    />
                </InputGroup>
                <InputValidation valid={valid} />
            </InputWithValidation>
        </FormGroup>
    );
};
