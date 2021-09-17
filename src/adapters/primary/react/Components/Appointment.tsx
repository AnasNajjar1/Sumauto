import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    Row,
    Col,
    Button,
    Input,
    FormGroup,
    Label,
    Container,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faCalendarAlt,
    faClock,
    faPlusCircle,
    faMinusCircle,
    faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
    faDotCircle as farDotCircle,
    faCircle as farCircle,
} from '@fortawesome/free-regular-svg-icons';
import { t } from 'autobiz-translate';

import { useHistory } from 'react-router-dom';
import {
    getDealerListSelector,
    getDealerSlotListSelector,
} from '../../view-models-generators/dealerSelectors';
import { getDealerListUseCase } from '../../../../hexagon/usecases/getDealerList/getDealerList.useCase';
import { Loader } from './Loader';
import { getDealerSlotListUseCase } from '../../../../hexagon/usecases/getDealerSlotList/getDealerSlotList.useCase';
import { Hour } from '../../../../hexagon/interfaces';
import { CtaBlock } from './CtaBlock';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { AccordionInfo } from './AccordionInfo';
import { FeatureGroup } from './FeatureGroup';
import { Feature } from './Feature';
import { NumberedTitle } from './NumberedTitle';
import { PhoneInput } from './PhoneInput';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';

type TAppointmentProps = {
    recordId: string;
};

export const Appointment: FunctionComponent<TAppointmentProps> = ({ recordId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { client } = useSelector(getClientSelector);

    const [dealerId, setDealerId] = useState<string | undefined>(undefined);
    const [showAllDealers, setShowAllDealers] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [hour, setHour] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [phoneValid, setPhoneValid] = useState<boolean>(false);
    const [hourList, setHourList] = useState<Hour[]>([]);

    const { data: dealerList, status: dealerStatus } = useSelector(getDealerListSelector);
    const { data: dealerSlotList, status: dealerSlotStatus } =
        useSelector(getDealerSlotListSelector);

    useEffect(() => {
        dispatch(getDealerListUseCase(recordId));
    }, [dispatch, recordId]);

    useEffect(() => {
        if (dealerId) {
            dispatch(getDealerSlotListUseCase(recordId, dealerId));
            setDate('');
            setHour('');
        }
    }, [dispatch, recordId, dealerId]);

    useEffect(() => {
        setPhoneValid(phone.search(new RegExp(client.config.phoneRegex)) === 0);
    }, [dispatch, phone]);

    useEffect(() => {
        if (date && dealerSlotList) {
            const found = dealerSlotList.find((s) => s.date === date)?.hours;
            if (found) {
                setHourList(found);
            }
        }
    }, [dispatch, date, dealerSlotList]);

    const formValid = [hour, date, dealerId, name].every(Boolean);

    const submitAppointment = () => {
        // saving appointment
        history.push(`./confirmation/${recordId}`);
    };

    return (
        <>
            <Container fluid>
                <NumberedTitle number={1} textKey="choose_your_point_of_sale" />
                <AccordionInfo
                    iconType="circle"
                    titleKey="professional_info"
                    detailsKey="professional_info_details"
                />
                <AccordionInfo
                    iconType="circle"
                    titleKey="pay_service_info"
                    detailsKey="pay_service_info_details"
                />
                <AccordionInfo
                    iconType="circle"
                    titleKey="selling_service_info"
                    detailsKey="selling_service_info_details"
                />
                <Loader status={dealerStatus}>
                    <div className={`dealers-list ${showAllDealers ? 'show-all' : ''}`}>
                        {dealerList.map((dealer, i) => (
                            <div
                                className={`button-dealer${i >= 3 ? ' hidden-dealer' : ''} ${
                                    dealer.id === dealerId ? 'selected' : ''
                                }`}
                                key={dealer.id}
                                role="button"
                                aria-hidden="true"
                                onClick={() => setDealerId(dealer.id)}
                            >
                                <div className="button-dealer-icon">
                                    <FontAwesomeIcon
                                        icon={dealer.id === dealerId ? farDotCircle : farCircle}
                                    />
                                </div>
                                <div>
                                    <div className="button-dealer-name">{dealer.name}</div>
                                    <div>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {dealer.city}{' '}
                                        {dealer.distance} {t('km')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {dealerList.length > 3 && (
                        <div
                            className="toggle-show-dealers"
                            role="button"
                            aria-hidden="true"
                            onClick={() => setShowAllDealers(!showAllDealers)}
                        >
                            <FontAwesomeIcon icon={showAllDealers ? faMinusCircle : faPlusCircle} />{' '}
                            <span>
                                {t(showAllDealers ? 'show_less_dealers' : 'show_more_dealers')}
                            </span>
                        </div>
                    )}
                </Loader>
            </Container>
            {dealerId && (
                <div className="choose-date-background">
                    <Container fluid>
                        <NumberedTitle number={2} textKey="choose_your_date" />

                        <AccordionInfo
                            iconType="circle"
                            titleKey="sell_requirement_info"
                            detailsKey="sell_requirement_info_details"
                        />
                        <AccordionInfo
                            iconType="circle"
                            titleKey="appointment_info"
                            detailsKey="appointment_info_details"
                        />
                        <AccordionInfo
                            iconType="circle"
                            titleKey="wainting_info"
                            detailsKey="waiting_info_details"
                        />

                        <Loader status={dealerSlotStatus}>
                            <Row>
                                <Col>
                                    <Label htmlFor="name">{t('date')}</Label>
                                    <InputWithValidation>
                                        <InputGroup>
                                            <Input
                                                type="select"
                                                onChange={(e) => setDate(e.currentTarget.value)}
                                                value={date}
                                            >
                                                <option value="">--</option>
                                                {dealerSlotList.map((s) => (
                                                    <option value={s.date} key={s.date}>
                                                        {s.date}
                                                    </option>
                                                ))}
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText>
                                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <InputValidation valid={!!date} />
                                    </InputWithValidation>
                                </Col>
                                <Col>
                                    {hourList && (
                                        <>
                                            <Label htmlFor="name">{t('hour')}</Label>
                                            <InputWithValidation>
                                                <InputGroup>
                                                    <Input
                                                        type="select"
                                                        onChange={(e) =>
                                                            setHour(e.currentTarget.value)
                                                        }
                                                        value={hour}
                                                    >
                                                        <option value="">--</option>
                                                        {hourList.map((s) => (
                                                            <option
                                                                value={s.id}
                                                                key={s.id}
                                                                disabled={s.status === 'closed'}
                                                            >
                                                                {s.hour}{' '}
                                                                {s.status === 'closed'
                                                                    ? `(${t('unavailable')})`
                                                                    : ''}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                    <InputGroupAddon addonType="append">
                                                        <InputGroupText>
                                                            <FontAwesomeIcon icon={faClock} />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <InputValidation valid={!!hour} />
                                            </InputWithValidation>
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Loader>
                    </Container>
                    <Container fluid className="mt-4">
                        <NumberedTitle number={3} textKey="your_contact" />
                        <AccordionInfo
                            iconType="circle"
                            titleKey="contact_info"
                            detailsKey="contact_info_details"
                        />
                        <Row>
                            <Col xs={12} sm={6}>
                                <FormGroup>
                                    <Label htmlFor="name">{t('name')} *</Label>
                                    <InputWithValidation>
                                        <InputGroup>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.currentTarget.value)}
                                            />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText>
                                                    <FontAwesomeIcon icon={faUser} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <InputValidation valid={!!name} />
                                    </InputWithValidation>
                                </FormGroup>
                            </Col>

                            <Col xs={12} sm={6}>
                                <PhoneInput />
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}

            <Container fluid>
                {/*
                {formValid && (
                    <>
                        <h2 className="mt-4">{t('appointment_resume')}</h2>

                        <Row>
                            <Col> <AppointmentResume date={date} hour={hour} /> </Col>
                            <Col>
                                <Picture background="calendar" />
                            </Col>
                        </Row>
                    </>
                )}
                */}
                <CtaBlock>
                    <Button
                        color="primary"
                        disabled={!formValid}
                        className="mt-3"
                        onClick={submitAppointment}
                    >
                        {t('book_an_appointment_now')}
                    </Button>
                </CtaBlock>
                <FeatureGroup>
                    <Feature label="immediate_sale_and_without_obligation" icon="clock" />
                    <Feature label="total_security" icon="lock" />
                    <Feature label="without_cumbersome_procedures" icon="check" />
                </FeatureGroup>
                <Row>
                    <Col>
                        <div className="feature-details">
                            {t('immediate_sale_and_without_obligation_details')}
                        </div>
                    </Col>
                    <Col>
                        <div className="feature-details">{t('total_security_details')}</div>
                    </Col>
                    <Col>
                        <div className="feature-details">
                            {t('without_cumbersome_procedures_details')}
                        </div>
                    </Col>
                </Row>
                <p className="footnote">{t('appoitment_note')}</p>
            </Container>
        </>
    );
};
