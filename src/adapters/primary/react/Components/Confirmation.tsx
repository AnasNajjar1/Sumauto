import React, { FunctionComponent, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'autobiz-translate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';

import { Map } from './Map';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { getRecordUseCase } from '../../../../hexagon/usecases/getRecord/getRecord.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { FeatureGroup } from './FeatureGroup';
import { Feature } from './Feature';
import { AppointmentResume } from './AppointmentResume';
import { cancelAppointmentUseCase } from '../../../../hexagon/usecases/cancelAppoitment/cancelAppointment.useCase';

export const Confirmation = () => {
    const dispatch = useDispatch();
    const { recordId } = useParams<{ recordId: string }>();
    const { data: record } = useSelector(getRecordSelector);
    const [modalCancel, setModalCancel] = useState(false);
    const toggleModalCancel = () => setModalCancel(!modalCancel);
    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        dispatch(getRecordUseCase(recordId));
    }, [dispatch, recordId]);

    const handleSubmitForm = () => {
        dispatch(cancelAppointmentUseCase(recordId));
    };

    return (
        <div className="page page-confirmation">
            <Container fluid>
                <div className="d-flex ">
                    <div className="w-100">
                        <h1 className="text-center">{t('confirmation.title')}</h1>
                    </div>
                    <div
                        className="align-self-start text-nowrap print-button"
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
                        <Row className="container">
                            <Col className="left-side">
                                <AppointmentResume
                                    date={record.appointment.dateHour}
                                    placeName={record.appointment.place.name}
                                />
                                <Row className="location">
                                    <Col>
                                        <h2>{t('your_point_of_sale')}</h2>
                                        <Row>
                                            <b>{record.appointment.place.name}</b>
                                        </Row>
                                        <p>
                                            {record.appointment.place.address}
                                            <br />
                                            {record.appointment.place.zipCode}{' '}
                                            {record.appointment.place.city}
                                            <br />
                                            Tel.{' '}
                                            <a href="tel:{record.appointment.place.phone}">
                                                {record.appointment.place.phone}
                                            </a>
                                        </p>
                                    </Col>
                                    <Col>
                                        <Map coordinates={record.appointment.place.position} />
                                    </Col>
                                </Row>
                                <Row className="button-row">
                                    <Col className="button-col">
                                        <Button block color="primary">
                                            {t('postpone_appointment')}
                                        </Button>
                                    </Col>
                                    <Col className="button-col">
                                        <Button block color="secondary" onClick={toggleModalCancel}>
                                            {t('cancel_appointment')}
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="right-side">
                                <h2>{t('documents_title')}</h2>
                                {t('documents_text')}
                                <hr />
                                <h2>{t('other_informations_title')}</h2>
                                {t('other_informations_text')}
                            </Col>
                        </Row>
                        <Modal isOpen={modalCancel} toggle={toggleModalCancel} centered>
                            <ModalHeader toggle={toggleModalCancel}>
                                {t('cancel_appointment.title')}
                            </ModalHeader>
                            <ModalBody>{t('cancel_appointment.description')}</ModalBody>
                            <ModalFooter className="justify-content-center">
                                <Button color="primary" onClick={() => handleSubmitForm()}>
                                    {t('cancel_appointment.cta')}
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
