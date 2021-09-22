import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { t } from 'autobiz-translate';

import { useParams } from 'react-router-dom';

import { Map } from './Map';
import { FeatureGroup } from './FeatureGroup';
import { Feature } from './Feature';
import { AppointmentResume } from './AppointmentResume';
import { cancelAppointmentUseCase } from '../../../../hexagon/usecases/cancelAppointment/cancelAppointment.useCase';
import { Picture } from './Picture';
import { TRecord } from '../../../../hexagon/interfaces';

export const Confirmation: React.FC<TRecord> = (props) => {
    const dispatch = useDispatch();

    const record = props;

    const [modalCancel, setModalCancel] = useState(false);
    const toggleModalCancel = () => setModalCancel(!modalCancel);
    const handlePrint = () => {
        window.print();
    };

    const handleSubmitCancel = () => {
        dispatch(cancelAppointmentUseCase(record.id));
    };

    const handleSubmitPostpone = () => {
        dispatch(cancelAppointmentUseCase(record.id));
    };

    return (
        <div className="page page-confirmation">
            <Container fluid>
                <div
                    className="text-right text-nowrap print-button d-print-none"
                    role="button"
                    aria-hidden="true"
                    onClick={handlePrint}
                >
                    <span className="px-2 small">{t('print')}</span>
                    <Picture background="icon-print" />
                </div>

                <h1 className="mb-4">{t('confirmation_title')}</h1>
                {record.appointment && (
                    <>
                        <Row>
                            <Col md={6}>
                                <AppointmentResume
                                    date={record.appointment.dateHour}
                                    hour={record.appointment.dateHour}
                                    placeName={record.appointment.place.name}
                                />
                                {record.offerNumber}
                                <Row>
                                    <Col sm={6} md={12} lg={6}>
                                        <h2>{t('your_point_of_sale')}</h2>

                                        <p>
                                            <strong>{record.appointment.place.name}</strong>
                                        </p>
                                        <p>
                                            {record.appointment.place.address}
                                            <br />
                                            {record.appointment.place.zipCode}{' '}
                                            {record.appointment.place.city}
                                            <br />
                                            {t('phone_short')}{' '}
                                            <a href={`tel:${record.appointment.place.phone}`}>
                                                {record.appointment.place.phone}
                                            </a>
                                        </p>
                                    </Col>
                                    <Col sm={6} md={12} lg={6}>
                                        <Map coordinates={record.appointment.place.position} />
                                    </Col>
                                </Row>
                                <Row className="d-print-none">
                                    <Col sm={6} xl={5}>
                                        <Button
                                            block
                                            onClick={() => handleSubmitPostpone()}
                                            className="postpone-appointment mb-2"
                                        >
                                            {t('postpone_appointment')}
                                        </Button>
                                    </Col>
                                    <Col sm={6} xl={5}>
                                        <Button
                                            block
                                            className="cancel-appointment mb-2"
                                            onClick={toggleModalCancel}
                                        >
                                            {t('cancel_appointment')}
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <h3>{t('documents_title')}</h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: t('documents_text_html') || '',
                                    }}
                                />
                                <hr />
                                <h3>{t('other_informations_title')}</h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: t('other_informations_text_html') || '',
                                    }}
                                />
                            </Col>
                        </Row>

                        <Modal isOpen={modalCancel} toggle={toggleModalCancel} centered>
                            <ModalHeader toggle={toggleModalCancel}>
                                {t('cancel_appointment_title')}
                            </ModalHeader>
                            <ModalBody>{t('cancel_appointment_description')}</ModalBody>
                            <ModalFooter className="justify-content-center">
                                <Button block onClick={() => handleSubmitCancel()}>
                                    {t('cancel_appointment_cta')}
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </>
                )}

                <div className="mt-5">
                    <FeatureGroup>
                        <Feature label="personal_evaluation" icon="user" />
                        <Feature label="100_free" icon="like" />
                        <Feature label="without_obligation" icon="sun" />
                    </FeatureGroup>
                </div>
            </Container>
        </div>
    );
};
