import React, { FunctionComponent, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'autobiz-translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { Map } from './Map';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { getRecordUseCase } from '../../../../hexagon/usecases/getRecord/getRecord';
import { getClientSelector } from '../../view-models-generators/clientSelector';

export const Confirmation = () => {
    const dispatch = useDispatch();
    const { recordId } = useParams<{ recordId: string }>();
    const { data: record, status } = useSelector(getRecordSelector);
    const { client } = useSelector(getClientSelector);
    const handlePrint = () => {
        window.print();
    };

    import(`moment/locale/${'fr'}`).then();

    useEffect(() => {
        dispatch(getRecordUseCase(recordId));
    }, [dispatch, recordId]);

    return (
        <div className="page page-confirmation">
            <Container fluid>
                <div className="d-flex ">
                    <div className="w-100">
                        <h1>{t('your_appointment_has_been_confirmed')}</h1>
                    </div>
                    <div
                        className="align-self-center text-nowrap"
                        role="button"
                        aria-hidden="true"
                        onClick={handlePrint}
                    >
                        <span className="px-2">{t('print')}</span>
                        <FontAwesomeIcon icon={faPrint} />
                    </div>
                </div>
                {record.appointment && (
                    <>
                        <Row>
                            <Col>
                                <p>{t('we_wish_you_a_pleasant_date')}</p>
                                <p>{moment(record.appointment.dateHour).format('LLLL')}</p>
                                <h2>{t('address')}</h2>
                                <p>
                                    {record.appointment.place.address}
                                    <br />
                                    {record.appointment.place.zipCode}{' '}
                                    {record.appointment.place.city}
                                    <br />
                                    <a href="tel:{record.appointment.place.phone}">
                                        {record.appointment.place.phone}
                                    </a>
                                </p>
                            </Col>
                            <Col>
                                <Map coordinates={record.appointment.place.position} />
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col>
                                <Button block color="primary">
                                    {t('postpone_appointment')}
                                </Button>
                            </Col>
                            <Col>
                                <Button block color="secondary">
                                    {t('cancel_appointment')}
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>{t('documents_title')}</h2>
                                {t('documents_text')}
                                <hr />
                                <h2>{t('other_informations_title')}</h2>
                                {t('other_informations_text')}
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );
};
