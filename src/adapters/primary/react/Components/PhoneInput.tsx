import React, { useEffect, useState } from 'react';
import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import { setParticularValue } from '../../../../hexagon/usecases/setParticularValue/setParticularValue.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { getFormSelector } from '../../view-models-generators/formSelectors';
import { checkFormValidUseCase } from '../../../../hexagon/usecases/checkFormValid/checkFormValid.useCase';
import useTranslation from '../hooks/useTranslation';

type TPhoneInputProps = {
    required: boolean;
    scope: 'phone' | 'phone2';
};

export const PhoneInput: React.FC<TPhoneInputProps> = ({ required, scope }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { particular } = useSelector(getFormSelector);
    const { config } = useSelector(getClientSelector);

    const [phone, setPhone] = useState<string>('');
    const [valid, setValid] = useState<boolean>();

    const isValidPhone = (value: string) =>
        value.search(new RegExp(config.phoneRegex)) === 0 ||
        (value.length === 0 && required === false);

    useEffect(() => {
        let telephone = '';
        if (scope === 'phone') telephone = particular.phone;
        else if (scope === 'phone2') telephone = particular.phone2;
        setPhone(telephone);
        if (isValidPhone(telephone || '')) setValid(true);
        else setValid(false);
    }, [dispatch, particular.phone, particular.phone2]);

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
            if (scope === 'phone') dispatch(setParticularValue('phone', phone));
            else if (scope === 'phone2') {
                dispatch(setParticularValue('phone2', phone));
                if (!particular.phone) dispatch(setParticularValue('phone', phone));
            }
        } else if (scope === 'phone') dispatch(setParticularValue('phone', ''));
        else if (scope === 'phone2') dispatch(setParticularValue('phone2', ''));
    };

    useEffect(() => {
        if (!phone && required === false) dispatch(checkFormValidUseCase(true));
        if (_.isBoolean(valid)) dispatch(checkFormValidUseCase(valid));
    }, [phone, valid]);

    return (
        <>
            <FormGroup className="form-group-phone">
                <Label for="phone">{required ? t('phone_required') : t('phone')}</Label>
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
                    {!_.isUndefined(phone) && <InputValidation valid={valid} />}
                </InputWithValidation>
            </FormGroup>
        </>
    );
};
