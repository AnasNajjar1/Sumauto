import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    Col,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'autobiz-translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import { setParticularValue } from '../../../../hexagon/usecases/setParticularValue/setParticularValue.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';
import { getFormSelector } from '../../view-models-generators/formSelectors';

export const EmailInput: FunctionComponent = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [emailConfirmation, setEmailConfirmation] = useState<string>('');
    const [validEmail, setValidEmail] = useState<boolean>();
    const [validEmailConfirmation, setValidEmailConfirmation] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { particular } = useSelector(getFormSelector);

    useEffect(() => {
        setEmail(particular.email);
        setEmailConfirmation(particular.email);
    }, [dispatch]);

    const { config } = useSelector(getClientSelector);

    const handleChange = (value: string) => {
        if (TextUtils.isEmailValid(value)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
            if (value === '') {
                setErrorMessage('email_required');
            } else {
                setErrorMessage('wrong_email');
            }
        }
        setEmail(value);
    };

    const handleChangeConfirmation = (value: string) => {
        setEmailConfirmation(value);
        if (TextUtils.isEmailValid(value)) {
            if (email === value) {
                setValidEmailConfirmation(true);
                setValidEmail(true);
            } else {
                setValidEmailConfirmation(false);
                setValidEmail(false);
                setErrorMessage('email_mismatch');
            }
        } else {
            if (value === '') {
                setErrorMessage('email_required');
            } else {
                setErrorMessage('wrong_email');
            }
            setValidEmailConfirmation(false);
        }
    };

    const handleBlur = () => {
        if (config.emailConfirmation) {
            if (validEmail && validEmailConfirmation) {
                dispatch(setParticularValue('email', email));
            } else {
                dispatch(setParticularValue('email', ''));
            }
        } else if (validEmail) {
            dispatch(setParticularValue('email', email));
        } else {
            dispatch(setParticularValue('email', ''));
        }
    };

    return (
        <Row>
            <Col xs={12} md={6}>
                <FormGroup className="form-group-email">
                    <Label for="email">{t('email')}</Label>
                    <InputWithValidation>
                        <InputGroup>
                            <Input
                                type="tel"
                                id="email"
                                value={email}
                                onChange={(e) => handleChange(e.target.value)}
                                onBlur={() => handleBlur()}
                            />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        <InputValidation valid={validEmail} />
                    </InputWithValidation>
                    {validEmail === false && <p className="text-danger small">{t(errorMessage)}</p>}
                </FormGroup>
            </Col>
            {config.emailConfirmation && (
                <Col xs={12} md={6}>
                    <FormGroup className={`form-group-${'emailConfirmation'}`}>
                        <Label for="emailConfirmation">{t('emailConfirmation')}</Label>
                        <InputWithValidation>
                            <InputGroup>
                                <Input
                                    type="tel"
                                    id="emailConfirmation"
                                    value={emailConfirmation}
                                    onChange={(e) => handleChangeConfirmation(e.target.value)}
                                    onBlur={() => handleBlur()}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <InputValidation valid={validEmailConfirmation} />
                        </InputWithValidation>
                        {validEmailConfirmation === false && (
                            <p className="text-danger small">{t(errorMessage)}</p>
                        )}
                    </FormGroup>
                </Col>
            )}
        </Row>
    );
};
