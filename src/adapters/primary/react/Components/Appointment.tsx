import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
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
    faPhone,
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
import { getDealerList } from '../../../../hexagon/usecases/getDealerList/getDealerList';
import { Loader } from './Loader';
import { getDealerSlotList } from '../../../../hexagon/usecases/getDealerSlotList/getDealerSlotList';
import { Hour } from '../../../../hexagon/interfaces';
import { CtaBlock } from './CtaBlock';
import { getClientSelector } from '../../view-models-generators/clientSelector';

type TAppointmentProps = {
    zipCode: string;
    recordId: string;
};

export const Appointment: FunctionComponent<TAppointmentProps> = ({ recordId, zipCode }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { client } = useSelector(getClientSelector);

    const [dealerId, setDealerId] = useState<number | undefined>(undefined);
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
        dispatch(getDealerList(zipCode));
    }, [dispatch, zipCode]);

    useEffect(() => {
        if (dealerId) {
            dispatch(getDealerSlotList(dealerId.toString()));
            setDate('');
            setHour('');
        }
    }, [dispatch, dealerId]);

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

    const formValid = [hour, date, dealerId, name, phoneValid].every(Boolean);

    const submitAppointment = () => {
        // saving appointment
        history.push(`./confirmation/${recordId}`);
    };

    return (
        <Container fluid>
            <h5>{t('choose_your_point_of_sale')}</h5>
            <Loader status={dealerStatus}>
                <div className={`dealers-list ${showAllDealers ? 'show-all' : ''}`}>
                    {dealerList.map((dealer, i) => (
                        <div
                            className={`button-dealer ${i >= 3 ? 'hidden-dealer' : ''} ${
                                dealer.dealerId === dealerId ? 'selected' : ''
                            }`}
                            key={dealer.id}
                            role="button"
                            aria-hidden="true"
                            onClick={() => setDealerId(dealer.dealerId)}
                        >
                            <div className="button-dealer-icon">
                                <FontAwesomeIcon
                                    icon={dealer.dealerId === dealerId ? farDotCircle : farCircle}
                                />
                            </div>
                            <div>
                                <div className="button-dealer-name">{dealer.name}</div>
                                <div>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {dealer.distance} Km
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    role="button"
                    aria-hidden="true"
                    onClick={() => setShowAllDealers(!showAllDealers)}
                >
                    <FontAwesomeIcon icon={showAllDealers ? faMinusCircle : faPlusCircle} />{' '}
                    {t(showAllDealers ? 'show_less_dealers' : 'show_more_dealers')}
                </div>
            </Loader>
            {dealerId && (
                <>
                    <h5 className="mt-4">{t('choose_your_date')}</h5>
                    <Loader status={dealerSlotStatus}>
                        <Row>
                            <Col>
                                <InputGroup>
                                    <Input
                                        type="select"
                                        onChange={(e) => setDate(e.currentTarget.value)}
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
                            </Col>
                            <Col>
                                {hourList && (
                                    <InputGroup>
                                        <Input
                                            type="select"
                                            onChange={(e) => setHour(e.currentTarget.value)}
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
                                )}
                            </Col>
                        </Row>
                    </Loader>

                    <h5 className="mt-4">{t('your_contact')}</h5>

                    <Row>
                        <Col xs={12} sm={6}>
                            <FormGroup>
                                <Label for="name">{t('name')} *</Label>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={(e) => setName(e.currentTarget.value)}
                                    />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                            <FontAwesomeIcon icon={faUser} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>

                        <Col xs={12} sm={6}>
                            <FormGroup>
                                <Label for="phone">{t('phone_number')}</Label>
                                <InputGroup>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        onChange={(e) => setPhone(e.currentTarget.value)}
                                    />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </>
            )}
            <CtaBlock>
                <Button
                    color="primary"
                    disabled={!formValid}
                    block
                    className="mt-3"
                    onClick={submitAppointment}
                >
                    {t('book_an_appointment_now')}
                </Button>
            </CtaBlock>
        </Container>
    );
};
