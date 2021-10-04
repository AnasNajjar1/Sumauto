import React, { useEffect, useState } from 'react';
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
import { checkFormValidUseCase } from '../../../../hexagon/usecases/checkFormValid/checkFormValid.useCase';

type TPhoneInputProps = {
    required: boolean;
};

export const PhoneInput: React.FC<TPhoneInputProps> = ({ required }) => {
    const dispatch = useDispatch();
    const { particular } = useSelector(getFormSelector);
    const { config } = useSelector(getClientSelector);

    const [phone, setPhone] = useState<string>('');
    const [valid, setValid] = useState<boolean>();

    const isValidPhone = (value: string) =>
        value.search(new RegExp(config.phoneRegex)) === 0 ||
        (value.length === 0 && required === false);

    useEffect(() => {
        setPhone(particular.phone);

        if (particular.phone) {
            if (isValidPhone(particular.phone)) setValid(true);
            else setValid(false);
        }
    }, [dispatch, particular.phone, isValidPhone]);

    const handleChange = (value: string) => {
        if (isValidPhone(value)) {
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

    useEffect(() => {
        if (!phone && required === false) dispatch(checkFormValidUseCase(true));
        if (phone && valid === false) dispatch(checkFormValidUseCase(false));
        if (phone && valid === true) dispatch(checkFormValidUseCase(true));
    }, [phone, valid]);

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
                            placeholder={t('phone_placeholder')}
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
