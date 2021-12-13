import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Container,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { stat } from 'fs';
import { CtaBlock } from './CtaBlock';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import useTranslation from '../hooks/useTranslation';
import { TRecord } from '../../../../hexagon/interfaces';
import { Picture } from './Picture';
import { VehicleInformations } from './VehicleInformations';
import { submitNotRollingVehicleUseCase } from '../../../../hexagon/usecases/submitNotRollingVehicle/submitNotRollingVehicle.useCase';
import { getNotRollingSelector } from '../../view-models-generators/notRollingSelectors';
import useScroll from '../hooks/useScroll';

export const NotRolling: React.FC<TRecord> = ({ customer, vehicle, offerNumber }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { scrollToElement } = useScroll();
    const { client } = useSelector(getClientSelector);
    const { status } = useSelector(getNotRollingSelector);

    const [phone, setPhone] = useState<string>(customer.phone);

    const [phoneValid, setPhoneValid] = useState<boolean | undefined>(undefined);
    const [formValid, setFormValid] = useState<boolean>(false);
    const [touched, setTouched] = useState<boolean>(false);

    const checkForm = () => {
        if (phone) {
            setPhoneValid(phone.search(new RegExp(client.config.phoneRegex)) === 0);
        } else {
            setPhoneValid(undefined);
        }
    };

    useEffect(() => {
        if (status === 'succeeded') scrollToElement('top', 0);
    }, [dispatch, status]);

    useEffect(() => {
        checkForm();
    }, [dispatch, status, phone]);

    useEffect(() => {
        setFormValid(phoneValid !== false);
    }, [dispatch, phoneValid]);

    const handleSubmit = () => {
        if (formValid) {
            dispatch(submitNotRollingVehicleUseCase(phone));
        }
        setTouched(true);
    };

    let phoneInputClass = '';

    if (touched) {
        phoneInputClass = phoneValid === false ? 'input-danger' : 'input-success';
    }

    if (status === 'succeeded') {
        return (
            <div className="page page-notrolling">
                <Container fluid>
                    <Row>
                        <Col sm={8}>
                            <h1>{t('notrolling_confirmation_title')}</h1>

                            <p>
                                {t('your_file_number')} <strong>{offerNumber}</strong>
                            </p>

                            <div className="d-block d-sm-none mb-4">
                                <Picture background="searching" />
                            </div>

                            <h1>{t('notrolling_confirmation_subtitle')}</h1>

                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t('notrolling_confirmation_message_html') || '',
                                }}
                            />

                            <div className="d-none d-lg-block">
                                <div className="form-section-title">{t('your_car')}</div>
                                <VehicleInformations vehicle={vehicle} />
                            </div>
                        </Col>
                        <Col sm={4} className="d-none d-sm-block">
                            <div className="mt-lg-5">
                                <Picture background="searching" />
                            </div>
                        </Col>
                    </Row>
                    <div className="d-block d-lg-none">
                        <div className="form-section-title">{t('your_car')}</div>
                        <VehicleInformations vehicle={vehicle} />
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="page page-notrolling">
            <Container fluid>
                <h1>{t('notrolling_title')}</h1>
                <p className="mb-4">{t('notrolling_description')}</p>

                <div className="form-notrolling">
                    <FormGroup>
                        <Label htmlFor="phone">{t('your_phone')}</Label>
                        <InputWithValidation>
                            <InputGroup className={phoneInputClass}>
                                <Input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    defaultValue={phone}
                                    placeholder={t('phone_placeholder')}
                                    className={phoneInputClass}
                                    onChange={(e) => setPhone(e.currentTarget.value)}
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

                <CtaBlock>
                    <Button color="primary" onClick={handleSubmit} disabled={!phoneValid}>
                        {t('confirm')}
                    </Button>
                </CtaBlock>
            </Container>
        </div>
    );
};
