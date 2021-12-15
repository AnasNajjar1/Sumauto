import React from 'react';
import {
    Col,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import { setParticularValue } from '../../../../hexagon/usecases/setParticularValue/setParticularValue.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';

import { getFormSelector } from '../../view-models-generators/formSelectors';
import useTranslation from '../hooks/useTranslation';

type EmailInputProps = {
    error?: boolean;
};

export const EmailInput: React.FC<EmailInputProps> = ({ error }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { config } = useSelector(getClientSelector);
    const { particular } = useSelector(getFormSelector);
    const {
        register,
        formState: { errors },
        getValues,
        handleSubmit,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            email: particular.email,
            emailConfirmation: particular.email,
        },
    });

    const validEmail = () => {
        let valid;
        if (errors.email || error) valid = false;
        if (!errors.email && getValues('email')) valid = true;
        return valid;
    };

    const validEmailConfirmation = () => {
        let valid;
        if (errors.emailConfirmation) valid = false;
        if (!errors.emailConfirmation && getValues('emailConfirmation')) valid = true;
        return valid;
    };

    const setEmail = (data: any) => {
        dispatch(setParticularValue('email', data.email));
    };

    if (errors.email || errors.emailConfirmation) {
        if (particular.email) dispatch(setParticularValue('email', ''));
    }

    return (
        <Row>
            <Col xs={12} md={6}>
                <FormGroup className="form-group-email" id="form_group_email">
                    <Label for="email">{t('email')}</Label>
                    <InputWithValidation>
                        <InputGroup>
                            <input
                                className="form-control"
                                placeholder={t('email_placeholder')}
                                type="email"
                                id="email"
                                {...register('email', {
                                    required: t('email_required'),
                                    validate: {
                                        isEmailValid: (value) =>
                                            TextUtils.isEmailValid(value) ? true : t('wrong_email'),
                                    },
                                })}
                                onBlur={handleSubmit(setEmail)}
                            />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        <InputValidation valid={validEmail()} />
                    </InputWithValidation>
                    {errors.email && <p className="text-danger small">{errors.email.message}</p>}
                </FormGroup>
            </Col>
            {config.emailConfirmation && (
                <Col xs={12} md={6}>
                    <FormGroup className="form-group-emailConfirmation">
                        <Label for="emailConfirmation">{t('emailConfirmation')}</Label>
                        <InputWithValidation>
                            <InputGroup>
                                <input
                                    className="form-control"
                                    placeholder={t('email_placeholder')}
                                    type="email"
                                    autoComplete="off"
                                    id="emailConfirmation"
                                    {...register('emailConfirmation', {
                                        required: t('email_required'),
                                        validate: {
                                            isEmailValid: (value) =>
                                                TextUtils.isEmailValid(value)
                                                    ? true
                                                    : t('wrong_email'),

                                            matchesPreviousPassword: (value) => {
                                                const { email } = getValues();
                                                return email === value || t('email_mismatch');
                                            },
                                        },
                                    })}
                                    onBlur={handleSubmit(setEmail)}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <InputValidation valid={validEmailConfirmation()} />
                        </InputWithValidation>
                        {errors.emailConfirmation && (
                            <p className="text-danger small">{errors.emailConfirmation.message}</p>
                        )}
                    </FormGroup>
                </Col>
            )}
        </Row>
    );
};
