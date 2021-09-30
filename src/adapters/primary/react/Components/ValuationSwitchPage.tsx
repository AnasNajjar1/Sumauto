import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Button, Col, Row } from 'reactstrap';

import { t } from 'autobiz-translate';
import { useDispatch, useSelector } from 'react-redux';
import { TRecord } from '../../../../hexagon/interfaces';
import { CtaBlock } from './CtaBlock';
import { Feature } from './Feature';
import { FeatureGroup } from './FeatureGroup';
import { Picture } from './Picture';
import { VehicleInformations } from './VehicleInformations';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { getRecordUseCase } from '../../../../hexagon/usecases/getRecord/getRecord.useCase';
import { Loader } from './Loader';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';

export const ValuationSwitch: React.FC<TRecord> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { journeyType, config } = useSelector(getClientSelector).client;
    const { locale, currency, privateSellLink } = config;

    const { recordId } = useParams<{ recordId: string }>();
    const { data: record, status } = useSelector(getRecordSelector);

    const { vehicle } = record;

    useEffect(() => {
        dispatch(getRecordUseCase(recordId));
    }, [dispatch, recordId]);

    if (journeyType !== 'valuation') history.push(`/record/${recordId}`);
    if (!privateSellLink) history.push(`/record/${recordId}`);

    if (!record.valuation) {
        return <></>;
    }

    const replacedPrivateSellLink = privateSellLink
        ?.replace('[make]', vehicle.makeName)
        .replace('[year]', vehicle.year)
        .replace('[month]', vehicle.month);

    console.log(vehicle);

    return (
        <Loader status={status}>
            <Container fluid>
                <div className="page page-record">
                    <h1 className="text-center">
                        {t('appraisal_of')} {vehicle.makeName} {vehicle.modelName}
                    </h1>
                    <Row>
                        <Col sm={6} className="text-center">
                            <div className="background-private-sell">
                                <Button
                                    target="_parent"
                                    href={replacedPrivateSellLink}
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
                                        record.valuation.privateValue,
                                    )}
                                </div>

                                <div
                                    className="text-left"
                                    dangerouslySetInnerHTML={{
                                        __html: t('private_sell_description_html') || '',
                                    }}
                                />

                                <Button target="_parent" href={replacedPrivateSellLink} block>
                                    {t('place_an_ad')}
                                </Button>
                            </div>
                        </Col>
                        <Col sm={6} className="text-center">
                            <div className="background-direct-sell">
                                <Button block className="d-none d-sm-block">
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

                                <Button block onClick={() => history.push(`/record/${recordId}`)}>
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
                                <VehicleInformations vehicle={vehicle} />
                            </div>
                            <FeatureGroup>
                                <Feature label="result_with_precision" icon="target" />
                                <Feature label="more_than_10_years_of_experience" icon="cockade" />
                                <Feature label="advanced_technology" icon="bulb" />
                            </FeatureGroup>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Loader>
    );
};
