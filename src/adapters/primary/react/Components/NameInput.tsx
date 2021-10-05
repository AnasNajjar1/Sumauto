import React, { useEffect, useState } from 'react';
import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'autobiz-translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import { setParticularValue } from '../../../../hexagon/usecases/setParticularValue/setParticularValue.useCase';
import { getFormSelector } from '../../view-models-generators/formSelectors';

export const NameInput: React.FC = () => {
    const dispatch = useDispatch();
    const { particular } = useSelector(getFormSelector);

    const [name, setName] = useState<string>('');
    const [nameTouched, setNameTouched] = useState<boolean>(false);

    useEffect(() => {
        if (particular.name) {
            setName(particular.name);
            setNameTouched(true);
        }
    }, [dispatch, particular.name]);

    const handleChange = (value: string) => {
        setNameTouched(true);
        setName(value);
    };

    const handleBlur = () => {
        dispatch(setParticularValue('name', name));
    };

    return (
        <FormGroup>
            <Label htmlFor="name">{t('name')}</Label>
            <InputWithValidation>
                <InputGroup>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={name}
                        onChange={(e) => handleChange(e.currentTarget.value)}
                        onBlur={() => handleBlur()}
                    />
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            <FontAwesomeIcon icon={faUser} />
                        </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
                <InputValidation valid={nameTouched ? !!name : undefined} />
            </InputWithValidation>
        </FormGroup>
    );
};
