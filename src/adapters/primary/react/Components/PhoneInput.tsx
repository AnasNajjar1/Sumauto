import React, { FunctionComponent, useEffect, useState } from 'react';
import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'autobiz-translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import { setParticularValue } from '../../../../hexagon/usecases/setParticularValue/setParticularValue.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { getFormSelector } from '../../view-models-generators/formSelectors';

export const PhoneInput: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { particular } = useSelector(getFormSelector);
    const { config } = useSelector(getClientSelector);

    const [phone, setPhone] = useState<string>('');
    const [valid, setValid] = useState<boolean>();

    useEffect(() => {
        setPhone(particular.phone);
    }, [dispatch]);

    const handleChange = (value: string) => {
        if (value.search(new RegExp(config.phoneRegex)) === 0) {
            setValid(true);
        } else {
            setValid(false);
        }
        setPhone(value);
    };

    const handleBlur = () => {
        if (valid) {
            dispatch(setParticularValue('phone', phone));
        } else {
            dispatch(setParticularValue('phone', ''));
        }
    };

    return (
        <>
            <FormGroup className="form-group-phone">
                <Label for="phone">{t('phone')}</Label>
                <InputWithValidation>
                    <InputGroup>
                        <Input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={() => handleBlur()}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <FontAwesomeIcon icon={faPhone} />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <InputValidation valid={valid} />
                </InputWithValidation>
            </FormGroup>
        </>
    );
};
