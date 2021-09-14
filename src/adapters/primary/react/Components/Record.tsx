import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
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

export const Record: FunctionComponent = () => {
    const dispatch = useDispatch();

    const { journeyType, config } = useSelector(getClientSelector).client;
    const { locale, currency, privateSellLink } = config;
    const { recordId } = useParams<{ recordId: string }>();

    const [skip, setSkip] = useState<boolean>(false);

    const { data: record, status } = useSelector(getRecordSelector);

    const canMakeAnAppointment = record?.valuation?.status && record?.valuation?.archived === false;
    const history = useHistory();
    useEffect(() => {
        dispatch(getRecordUseCase(recordId));
    }, [dispatch, recordId]);

    if (status === 'failed') {
        history.push('/error/404');
    }

    const displaySellChoice = journeyType === 'quotation' && !skip;

    return (
        <Container fluid>
            {(displaySellChoice && (
                <Loader status={status}>
                    <h1>
                        {t('appraisal_of')} {record.vehicle?.makeName} {record.vehicle?.modelName}
                    </h1>
                    <Row>
                        <Col className="text-center">
                            <Button target="_parent" href={privateSellLink} block color="primary">
                                {t('place_an_ad')}
                            </Button>
                            <Picture background="chat" />

                            <h3 color="secondary">{t('private_sell')}</h3>

                            <div className="display-3 text-secondary">
                                {TextUtils.formatPrice(locale, currency, record.valuation?.value)}
                            </div>

                            {t('private_sell_description')}

                            <Button target="_parent" href={privateSellLink} block color="primary">
                                {t('place_an_ad')}
                            </Button>
                        </Col>
                        <Col className="text-center">
                            <Button block color="primary" onClick={() => setSkip(true)}>
                                {t('book_an_appointment')}
                            </Button>
                            <Picture background="meeting" />
                            <h3 color="secondary">{t('direct_sell')}</h3>

                            <div className="display-3 text-primary">
                                {TextUtils.formatPrice(locale, currency, record.valuation?.value)}
                            </div>

                            {t('direct_sell_description')}

                            <Button block color="primary" onClick={() => setSkip(true)}>
                                {t('book_an_appointment')}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>{t('appointment_explanation_title')}</h2>
                            <p>{t('appointment_explanation_description')}</p>

                            <VehicleInformations vehicle={record?.vehicle} />

                            <FeatureGroup>
                                <Feature label="Result with precision" icon="target" />
                                <Feature label="more_than_10_years_of_experience" icon="cockade" />
                                <Feature label="advanced_technology" icon="bulb" />
                            </FeatureGroup>
                        </Col>
                    </Row>
                </Loader>
            )) || (
                <>
                    {record?.valuation && (
                        <Loader status={status}>
                            <Valuation {...record} />
                        </Loader>
                    )}
                    {canMakeAnAppointment && record.customer.zipCode && (
                        <Appointment recordId={recordId} zipCode={record.customer.zipCode} />
                    )}
                </>
            )}
        </Container>
    );
};
