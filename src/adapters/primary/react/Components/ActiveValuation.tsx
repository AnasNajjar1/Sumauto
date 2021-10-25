import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Container, Row } from 'reactstrap';

import { TRecord } from '../../../../hexagon/interfaces';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { AccordionInfo } from './AccordionInfo';
import { ProgressSteps } from './ProgressSteps';
import { Appointment } from './Appointment';
import useScroll from '../hooks/useScroll';
import useTranslation from '../hooks/useTranslation';

export const ActiveValuation: React.FC<TRecord> = (props) => {
    const { scrollToElement } = useScroll();
    const { t } = useTranslation();
    const { client } = useSelector(getClientSelector);
    const { locale, currency } = client.config;
    const { vehicle, valuation, uid, offerNumber } = props;

    return (
        <div className="page page-valuation">
            <Container fluid>
                <div className="text-center">
                    <h2 className="valuation-title">
                        {t('valuation_of_your_car')} {vehicle.makeName} {vehicle.modelName}
                    </h2>
                    {valuation && (
                        <div className="valuation-value">
                            {TextUtils.formatPrice(locale, currency, valuation.value)}
                        </div>
                    )}

                    <p className="valuation-description">{t('valuation_description')}</p>

                    <AccordionInfo
                        iconType="circle"
                        titleKey="valuation_info"
                        detailsKey="valuation_info_details"
                    />

                    <p>
                        {t('your_file_number')} <strong>{offerNumber}</strong>
                    </p>

                    <div className="motivation">
                        <h3 className="motivation-title">{t('motivation_to_continue')}</h3>
                        <ProgressSteps withLabels={false} progress={80} />
                        <Button
                            color="primary"
                            onClick={() => scrollToElement('appointment_container')}
                        >
                            {t('book_an_appointment_for_free')}
                        </Button>
                    </div>
                </div>
                <div className="alert-covid">
                    <AccordionInfo
                        iconType="triangle"
                        titleKey="covid_info"
                        detailsKey="covid_info_details"
                    />
                </div>

                <div id="appointment_container">
                    <Row>
                        <Col>
                            <Appointment recordUid={uid} />
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};
