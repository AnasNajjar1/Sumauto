import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Button,
    Input,
    Label,
    Container,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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

import _ from 'lodash';
import { updateLabel } from 'typescript';
import {
    getDealerListSelector,
    getDealerSlotListSelector,
} from '../../view-models-generators/dealerSelectors';
import { getDealerListUseCase } from '../../../../hexagon/usecases/getDealerList/getDealerList.useCase';
import { Loader } from './Loader';
import { getDealerSlotListUseCase } from '../../../../hexagon/usecases/getDealerSlotList/getDealerSlotList.useCase';
import { Hour } from '../../../../hexagon/interfaces';
import { CtaBlock } from './CtaBlock';
import { AccordionInfo } from './AccordionInfo';
import { FeatureGroup } from './FeatureGroup';
import { Feature } from './Feature';
import { NumberedTitle } from './NumberedTitle';
import { PhoneInput } from './PhoneInput';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import { Picture } from './Picture';
import { AppointmentResume } from './AppointmentResume';
import { NameInput } from './NameInput';
import { getFormSelector } from '../../view-models-generators/formSelectors';
import { saveAppointmentUseCase } from '../../../../hexagon/usecases/saveAppointment/saveAppointment.useCase';
import { updateUserInformationsUseCase } from '../../../../hexagon/usecases/updateUserInformation/updateUserInformations.useCase';
import { setParticularValue } from '../../../../hexagon/usecases/setParticularValue/setParticularValue.useCase';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';

type TAppointmentProps = {
    recordUid: string;
};

export const Appointment: React.FC<TAppointmentProps> = ({ recordUid }) => {
    const dispatch = useDispatch();

    const [dealer, setDealer] = useState<{ id: string; name: string }>({ id: '', name: '' });
    const [showAllDealers, setShowAllDealers] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [hour, setHour] = useState<string>('');
    const [hourList, setHourList] = useState<Hour[]>([]);

    const { data: dealerList, status: dealerStatus } = useSelector(getDealerListSelector);
    const { data: recordData } = useSelector(getRecordSelector);
    const { data: dealerSlotList, status: dealerSlotStatus } =
        useSelector(getDealerSlotListSelector);
    const { particular } = useSelector(getFormSelector);

    useEffect(() => {
        dispatch(getDealerListUseCase(recordUid));
        // Fill redux form values
        dispatch(setParticularValue('phone', recordData.customer.phone || ''));
        dispatch(setParticularValue('zipCode', recordData.customer.zipCode || ''));
        dispatch(setParticularValue('name', recordData.customer.name || ''));
    }, [dispatch, recordUid, recordData]);

    useEffect(() => {
        if (dealer?.id) {
            dispatch(getDealerSlotListUseCase(recordUid, dealer.id));
            setHour('');
        }
    }, [dispatch, recordUid, dealer]);

    useEffect(() => {
        if (!date) setDate(dealerSlotList[0]?.date);
        const firstHour = hourList?.find((h) => h.status === 'open');
        setHour(firstHour?.id || '');
    }, [dispatch, hourList, date, dealerSlotList]);

    useEffect(() => {
        if (dealerSlotList) {
            const hours = dealerSlotList.find((s) => s.date === date)?.hours;
            setHourList(hours || []);
        }
    }, [dispatch, dealerSlotList, date]);

    const formValid = [hour, date, dealer.id, particular.name, particular.phone].every(Boolean);

    const submitAppointment = () => {
        dispatch(saveAppointmentUseCase(recordUid, hour));
        dispatch(updateUserInformationsUseCase(recordUid));
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
                        {dealerList.map((d, i) => (
                            <div
                                className={`button-dealer${i >= 3 ? ' hidden-dealer' : ''} ${
                                    d.id === dealer.id ? 'selected' : ''
                                }`}
                                key={d.id}
                                role="button"
                                aria-hidden="true"
                                onClick={() =>
                                    setDealer({
                                        id: d.id,
                                        name: `${t('point_of_sale')} ${d.city}`,
                                    })
                                }
                            >
                                <div className="button-dealer-icon">
                                    <FontAwesomeIcon
                                        icon={d.id === dealer.id ? farDotCircle : farCircle}
                                    />
                                </div>
                                <div>
                                    <div className="button-dealer-name">
                                        {`${t('point_of_sale')} ${d.city}`}
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {d.distance}{' '}
                                        {t('km')}
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
            {dealer.id && (
                <div className="choose-date-background">
                    <Container fluid>
                        <NumberedTitle number={2} textKey="choose_your_date" />
                        <div className="mb-3">
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
                        </div>
                        <Loader status={dealerSlotStatus}>
                            <Row>
                                <Col>
                                    <Label>{t('date')}</Label>
                                    <InputWithValidation>
                                        <InputGroup>
                                            <Input
                                                type="select"
                                                onChange={(e) => setDate(e.currentTarget.value)}
                                                value={date}
                                            >
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
                                            <Label>{t('hour')}</Label>
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
                                                                value={s.id || ''}
                                                                key={s.hour}
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
                                <NameInput />
                            </Col>

                            <Col xs={12} sm={6}>
                                <PhoneInput required />
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}

            <Container fluid>
                {formValid && (
                    <>
                        <h2 className="mt-4">{t('appointment_resume')}</h2>
                        <Row>
                            <Col>
                                <AppointmentResume
                                    // placeName={`${t('point_of_sale')} ${dealer.city}`}
                                    placeName={dealer.name}
                                    date={date}
                                    hour={_.find(hourList, (o) => o.id === hour)?.hour || ''}
                                />
                            </Col>
                            <Col>
                                <Picture background="calendar" />
                            </Col>
                        </Row>
                    </>
                )}

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
