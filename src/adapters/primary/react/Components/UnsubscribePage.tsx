import React, { useEffect, useState } from 'react';
import {
    Button,
    Container,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faPhone,
    faExclamationTriangle,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CtaBlock } from './CtaBlock';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';
import { unsubscribeUseCase } from '../../../../hexagon/usecases/unsubscribe/unsubscribe.useCase';
import { getUnsubscribeSelector } from '../../view-models-generators/unsubscribeSelectors';
import useTranslation from '../hooks/useTranslation';

export const UnsubscribePage: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { client } = useSelector(getClientSelector);

    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [phoneValid, setPhoneValid] = useState<boolean | undefined>(undefined);
    const [emailValid, setEmailValid] = useState<boolean | undefined>(undefined);
    const [formValid, setFormValid] = useState<boolean>(false);
    const [touched, setTouched] = useState<boolean>(false);

    const { status } = useSelector(getUnsubscribeSelector);

    const checkForm = () => {
        if (phone) {
            setPhoneValid(phone.search(new RegExp(client.config.phoneRegex)) === 0);
        } else {
            setPhoneValid(undefined);
        }
        setEmailValid(TextUtils.isEmailValid(email));
    };

    useEffect(() => {
        checkForm();
    }, [dispatch, phone, email]);

    useEffect(() => {
        setFormValid(phoneValid !== false && emailValid === true);
    }, [dispatch, phoneValid, emailValid]);

    const handleSubmit = () => {
        if (formValid) {
            dispatch(unsubscribeUseCase(email, phone));
        }
        setTouched(true);
    };

    let emailInputClass = '';
    let phoneInputClass = '';

    if (touched) {
        emailInputClass = emailValid === false ? 'input-danger' : 'input-success';
        phoneInputClass = phoneValid === false ? 'input-danger' : 'input-success';
    }

    return (
        <div className="page page-unsubscribe">
            <Container fluid>
                <h1>{t('unscubscribe_title')}</h1>
                <p className="mb-4">{t('unscubscribe_description')}</p>

                <div className="form-unsubscribe">
                    <FormGroup>
                        <Label htmlFor="email">{t('email')}</Label>
                        <InputWithValidation>
                            <InputGroup className={emailInputClass}>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder={t('email_placeholder')}
                                    defaultValue={email}
                                    className={emailInputClass}
                                    onBlur={(e) => setEmail(e.currentTarget.value)}
                                    disabled={status === 'succeeded'}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <InputValidation valid={touched ? emailValid : undefined} />
                        </InputWithValidation>
                        {touched && !emailValid && (
                            <p className="text-danger small">{t('wrong_email')}</p>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="phone">{t('phone')}</Label>
                        <InputWithValidation>
                            <InputGroup className={phoneInputClass}>
                                <Input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    defaultValue={phone}
                                    placeholder={t('phone_placeholder')}
                                    className={phoneInputClass}
                                    onBlur={(e) => setPhone(e.currentTarget.value)}
                                    disabled={status === 'succeeded'}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <InputValidation valid={phoneValid} />
                        </InputWithValidation>
                        {touched && phoneValid === false && (
                            <p className="text-danger small">{t('wrong_phone')}</p>
                        )}
                    </FormGroup>
                </div>
                {status === 'succeeded' && (
                    <div className="unsubscribe-return valid">
                        <div className="unsubscribe-return-icon">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div className="unsubscribe-return-message">
                            {t('unsubscribe_confirmation_message')}
                        </div>
                    </div>
                )}
                {status === 'failed' && (
                    <div className="unsubscribe-return error">
                        <div className="unsubscribe-return-icon">
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                        </div>
                        <div className="unsubscribe-return-message">
                            {t('unsubscribe_error_message')}
                        </div>
                    </div>
                )}

                {status !== 'succeeded' && (
                    <CtaBlock>
                        <Button color="primary" onClick={handleSubmit}>
                            {t('unscubscribe_button')}
                        </Button>
                    </CtaBlock>
                )}
            </Container>
        </div>
    );
};
