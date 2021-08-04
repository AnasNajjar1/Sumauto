import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row, Col, Button, Input, FormGroup, Label, Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
} from 'react-router-dom';
import {
    getDealerListSelector,
    getDealerSlotListSelector,
} from '../../view-models-generators/dealerSelectors';
import { getDealerList } from '../../../../hexagon/usecases/getDealerList/getDealerList';
import { Loader } from './Loader';
import { getDealerSlotList } from '../../../../hexagon/usecases/getDealerSlotList/getDealerSlotList';
import { Hour, RouteParams } from '../../../../hexagon/interfaces';
import { t } from '../../../../hexagon/shared/utils/translate';

export const Appointment: FunctionComponent = () => {
    const dispatch = useDispatch();

    const [dealerId, setDealerId] = useState<number | undefined>(undefined);
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
        dispatch(getDealerList('75001'));
    }, [dispatch]);

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
            <h3>{t('we_make_an_appointment')}</h3>
            <div className="text-center">
                <div>{t('the_valuation_of_your')}</div>
                <div className="display-3 ">3400 €</div>
                <p>Lorem impsum</p>
            </div>
            <h5>1.Elige el centro de compra</h5>
            <Loader status={dealerStatus}>
                {dealerList.map((d) => (
                    <Button
                        className="mb-2"
                        block
                        key={d.id}
                        onClick={() => setDealerId(d.dealerId)}
                        color={d.dealerId === dealerId ? 'primary' : 'secondary'}
                    >
                        {d.name} ({d.distance} km)
                    </Button>
                ))}
            </Loader>
            {dealerId && (
                <>
                    <h5 className="mt-4">2. Elige la fecha de hora</h5>
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

                    <h5 className="mt-4">3 Tus datos de contacto</h5>

                    <Row>
                        <Col xs={12} sm={6}>
                            <FormGroup>
                                <Label for="name">Nombre</Label>
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
                                <Label for="phone">Numero de téléfono</Label>
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
            <Row>
                <Col>
                    <Button
                        color="primary"
                        disabled={!formValid}
                        block
                        className="mt-3"
                        onClick={submitAppointment}
                    >
                        Reservar una cita ahora
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};
