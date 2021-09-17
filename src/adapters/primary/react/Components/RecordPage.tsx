import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { t } from 'autobiz-translate';

import { getRecordUseCase } from '../../../../hexagon/usecases/getRecord/getRecord.useCase';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { Loader } from './Loader';
import { Valuation } from './Valuation/Valuation';
import { Appointment } from './Appointment';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { Picture } from './Picture';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';
import { VehicleInformations } from './VehicleInformations';
import { FeatureGroup } from './FeatureGroup';
import { Feature } from './Feature';
import { ErrorPage } from './ErrorPage';

export const RecordPage: FunctionComponent = () => {
    const dispatch = useDispatch();

    const { journeyType, config } = useSelector(getClientSelector).client;
    const { locale, currency, privateSellLink } = config;
    const { recordId } = useParams<{ recordId: string }>();

    const [skip, setSkip] = useState<boolean>(false);

    const { data: record, status } = useSelector(getRecordSelector);

    const { vehicle } = record;

    const canMakeAnAppointment = record?.valuation?.status && record?.valuation?.archived === false;

    useEffect(() => {
        dispatch(getRecordUseCase(recordId));
    }, [dispatch, recordId]);

    if (status === 'failed') {
        return <ErrorPage />;
    }

    const displaySellChoice = journeyType === 'valuation' && !skip;

    return (
        <div className="page page-record">
            <Container fluid>
                {(displaySellChoice && vehicle && (
                    <Loader status={status}>
                        <h1 className="text-center">
                            {t('appraisal_of')} {vehicle.makeName} {vehicle.modelName}
                        </h1>
                        <Row>
                            <Col sm={6} className="text-center">
                                <div className="background-private-sell">
                                    <Button
                                        target="_parent"
                                        href={privateSellLink}
                                        block
                                        className="d-none d-sm-block"
                                    >
                                        {t('place_an_ad')}
                                    </Button>
                                    <Picture background="chat" />

                                    <h3>{t('private_sell')}</h3>

                                    <div className="valuation valuation-private">
                                        {TextUtils.formatPrice(
                                            locale,
                                            currency,
                                            record.valuation.value,
                                        )}
                                    </div>

                                    <div
                                        className="text-left"
                                        dangerouslySetInnerHTML={{
                                            __html: t('private_sell_description_html') || '',
                                        }}
                                    />

                                    <Button target="_parent" href={privateSellLink} block>
                                        {t('place_an_ad')}
                                    </Button>
                                </div>
                            </Col>
                            <Col sm={6} className="text-center">
                                <div className="background-direct-sell">
                                    <Button
                                        block
                                        className="d-none d-sm-block"
                                        onClick={() => setSkip(true)}
                                    >
                                        {t('book_an_appointment')}
                                    </Button>
                                    <Picture background="meeting" />
                                    <h3>{t('direct_sell')}</h3>
                                    <div className="valuation valuation-direct">
                                        {TextUtils.formatPrice(
                                            locale,
                                            currency,
                                            record.valuation?.value,
                                        )}
                                    </div>

                                    <div
                                        className="text-left"
                                        dangerouslySetInnerHTML={{
                                            __html: t('direct_sell_description_html') || '',
                                        }}
                                    />

                                    <Button block onClick={() => setSkip(true)}>
                                        {t('book_an_appointment')}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>{t('appointment_explanation_title')}</h2>
                                <p>{t('appointment_explanation_description')}</p>

                                <div className="vehicle-informations-container mb-4">
                                    <VehicleInformations vehicle={record?.vehicle} />
                                </div>
                                <FeatureGroup>
                                    <Feature label="result_with_precision" icon="target" />
                                    <Feature
                                        label="more_than_10_years_of_experience"
                                        icon="cockade"
                                    />
                                    <Feature label="advanced_technology" icon="bulb" />
                                </FeatureGroup>
                            </Col>
                        </Row>
                    </Loader>
                )) || (
                    <>
                        {record.valuation && (
                            <Loader status={status}>
                                <Valuation {...record} />
                            </Loader>
                        )}
                        {canMakeAnAppointment && <Appointment recordId={recordId} />}
                    </>
                )}
            </Container>
        </div>
    );
};
