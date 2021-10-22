import React, { useEffect, useState } from 'react';
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

import { Map } from './Map';
import { FeatureGroup } from './FeatureGroup';
import { Feature } from './Feature';
import { AppointmentResume } from './AppointmentResume';
import { cancelAppointmentUseCase } from '../../../../hexagon/usecases/cancelAppointment/cancelAppointment.useCase';
import { Picture } from './Picture';
import { TRecord } from '../../../../hexagon/interfaces';
import useScroll from '../hooks/useScroll';

export const Confirmation: React.FC<TRecord> = (props) => {
    const dispatch = useDispatch();
    const { scrollToElement } = useScroll();

    const record = props;

    const [modalCancel, setModalCancel] = useState(false);
    const toggleModalCancel = () => setModalCancel(!modalCancel);
    const handlePrint = () => {
        window.print();
    };

    const handleSubmitCancel = () => {
        dispatch(cancelAppointmentUseCase(record.uid));
    };

    const handleSubmitPostpone = () => {
        dispatch(cancelAppointmentUseCase(record.uid));
    };

    useEffect(() => {
        if (modalCancel) {
            scrollToElement('top');
        }
    }, [dispatch, modalCancel]);

    return (
        <div className="page page-confirmation" id="top">
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

                <p className="text-center">
                    {t('your_file_number')} <strong>{record.offerNumber}</strong>
                </p>

                {record.appointment && (
                    <>
                        <Row>
                            <Col md={6}>
                                <AppointmentResume
                                    date={record.appointment.appointmentDate}
                                    hour={record.appointment.startHour}
                                    placeName={record.appointment.realDealerName}
                                />

                                <Row>
                                    <Col sm={6} md={12} lg={6}>
                                        <h2>{t('your_point_of_sale')}</h2>

                                        <p>
                                            <strong>{record.appointment.realDealerName}</strong>
                                        </p>
                                        <p>
                                            {record.appointment.address}
                                            <br />
                                            {record.appointment.zipCode} {record.appointment.city}
                                            <br />
                                            {record.appointment.phone && (
                                                <>
                                                    {t('phone_short')}{' '}
                                                    <a href={`tel:${record.appointment.phone}`}>
                                                        {record.appointment.phone}
                                                    </a>
                                                </>
                                            )}
                                        </p>
                                    </Col>
                                    <Col sm={6} md={12} lg={6}>
                                        <Map
                                            coordinates={{
                                                lat: record.appointment.latitude,
                                                lng: record.appointment.longitude,
                                            }}
                                        />
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
                            <Col md={6} className="mt-4">
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

                        <Modal isOpen={modalCancel} toggle={toggleModalCancel}>
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
