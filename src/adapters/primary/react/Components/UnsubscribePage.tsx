import { t } from 'autobiz-translate';

import React, { FunctionComponent, useEffect, useState } from 'react';
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
import { Loader } from './Loader';

export const UnsubscribePage: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { client } = useSelector(getClientSelector);

    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [phoneValid, setPhoneValid] = useState<boolean | undefined>(undefined);
    const [emailValid, setEmailValid] = useState<boolean | undefined>(undefined);
    const [formValid, setFormValid] = useState<boolean>(false);

    const { status } = useSelector(getUnsubscribeSelector);

    useEffect(() => {
        if (phone) setPhoneValid(phone.search(new RegExp(client.config.phoneRegex)) === 0);
        else setPhoneValid(undefined);
        if (email) setEmailValid(TextUtils.isEmailValid(email));
        else setEmailValid(undefined);
    }, [dispatch, phone, email]);

    useEffect(() => {
        setFormValid(phoneValid === true && emailValid === true);
    }, [dispatch, phoneValid, emailValid]);

    let emailInputClass = '';
    let phoneInputClass = '';

    if (email) emailInputClass = emailValid === false ? 'input-danger' : 'input-success';
    else emailInputClass = '';
    if (phone) phoneInputClass = phoneValid === false ? 'input-danger' : 'input-success';
    else phoneInputClass = '';

    const handleSubmit = () => {
        dispatch(unsubscribeUseCase(email, phone));
    };

    useEffect(() => {
        setPhone('');
        setEmail('');
    }, [dispatch]);

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
                            <InputValidation valid={emailValid} />
                        </InputWithValidation>
                        {email && !emailValid && <p className="text-danger">{t('wrong_email')}</p>}
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
                        {phone && !phoneValid && <p className="text-danger">{t('wrong_phone')}</p>}
                    </FormGroup>
                </div>

                <Loader status={status}>
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
                </Loader>

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
