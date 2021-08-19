import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row, Col, Button, Input, FormGroup, Label, Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { t } from 'autobiz-translate';
import {
    getDealerListSelector,
    getDealerSlotListSelector,
} from '../../view-models-generators/dealerSelectors';
import { getDealerList } from '../../../../hexagon/usecases/getDealerList/getDealerList';
import { Loader } from './Loader';
import { getDealerSlotList } from '../../../../hexagon/usecases/getDealerSlotList/getDealerSlotList';
import { Hour } from '../../../../hexagon/interfaces';
import { CtaBlock } from './CtaBlock';

type TAppointmentProps = {
    zipCode: string;
};

export const Appointment: FunctionComponent<TAppointmentProps> = ({ zipCode }) => {
    const dispatch = useDispatch();

    const [dealerId, setDealerId] = useState<number | undefined>(undefined);
    const [showAllDealers, setShowAllDealers] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [hour, setHour] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [terms, setTerms] = useState<boolean>(false);
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
        if (date && dealerSlotList) {
            const found = dealerSlotList.find((s) => s.date === date)?.hours;
            if (found) {
                setHourList(found);
            }
        }
    }, [dispatch, date, dealerSlotList]);

    const formValid = [hour, date, dealerId, name, phone, terms].every(Boolean);

    const submitAppointment = () => {
        console.log(terms);
    };

    return (
        <Container fluid>
            <h5>{t('choose_your_point_of_sale')}</h5>
            <Loader status={dealerStatus}>
                <div className={`dealers-list ${showAllDealers ? 'show-all' : ''}`}>
                    {dealerList.map((dealer, i) => (
                        <Button
                            className={i >= 3 ? 'hidden-dealer' : ''}
                            block
                            key={dealer.id}
                            onClick={() => setDealerId(dealer.dealerId)}
                            color={dealer.dealerId === dealerId ? 'primary' : 'secondary'}
                        >
                            {dealer.name} ({dealer.distance} km)
                        </Button>
                    ))}
                </div>

                <div
                    role="button"
                    aria-hidden="true"
                    onClick={() => setShowAllDealers(!showAllDealers)}
                >
                    {t(showAllDealers ? 'show_less_dealers' : 'show_more_dealers')}
                </div>
            </Loader>
            {dealerId && (
                <>
                    <h5 className="mt-4">{t('choose_your_date')}</h5>
                    <Loader status={dealerSlotStatus}>
                        <Row>
                            <Col>
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
                            </Col>
                            <Col>
                                {hourList && (
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
                                                {s.hour}
                                            </option>
                                        ))}
                                    </Input>
                                )}
                            </Col>
                        </Row>
                    </Loader>

                    <h5 className="mt-4">{t('your_contact')}</h5>

                    <Row>
                        <Col xs={12} sm={6}>
                            <FormGroup>
                                <Label for="name">{t('name')}</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={(e) => setName(e.currentTarget.value)}
                                />
                            </FormGroup>
                        </Col>

                        <Col xs={12} sm={6}>
                            <FormGroup>
                                <Label for="phone">{t('phone_number')}</Label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    onChange={(e) => setPhone(e.currentTarget.value)}
                                />
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
                    Reservar una cita ahora
                </Button>
            </CtaBlock>
        </Container>
    );
};
