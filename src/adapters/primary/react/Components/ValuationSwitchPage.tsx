import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Button, Col, Row } from 'reactstrap';

import { t } from 'autobiz-translate';
import { useDispatch, useSelector } from 'react-redux';
import { TRecord } from '../../../../hexagon/interfaces';
import { Feature } from './Feature';
import { FeatureGroup } from './FeatureGroup';
import { Picture } from './Picture';
import { VehicleInformations } from './VehicleInformations';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { getRecordUseCase } from '../../../../hexagon/usecases/getRecord/getRecord.useCase';
import { Loader } from './Loader';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';
import useScroll from '../hooks/useScroll';
import { createIndicatorUseCase } from '../../../../hexagon/usecases/createIndicator/createIndicator.useCase';

export const ValuationSwitch: React.FC<TRecord> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { scrollToElement } = useScroll();
    const { journeyType, config } = useSelector(getClientSelector).client;
    const { locale, currency, privateSellLink, name: siteName } = config;

    const { recordUid } = useParams<{ recordUid: string }>();
    const { data: record, status } = useSelector(getRecordSelector);

    const { vehicle, offerNumber } = record;

    useEffect(() => {
        dispatch(getRecordUseCase(recordUid));
    }, [dispatch, recordUid]);

    useEffect(() => {
        if (status === 'succeeded') scrollToElement('top');
    }, [dispatch, status]);

    if (journeyType !== 'valuation') history.push(`/record/${recordUid}`);
    if (!privateSellLink) history.push(`/record/${recordUid}`);

    if (record.offerStatus === 'UNQUOTABLE') history.push(`/record/${recordUid}`);

    if (!record.valuation) {
        return <></>;
    }

    const trackAndNavigate = async (type: 'private-sell' | 'direct-sell') => {
        if (type === 'private-sell') {
            const replacedPrivateSellLink = privateSellLink
                ?.replace('[make]', TextUtils.translateMakeId(vehicle.makeId))
                .replace('[year]', vehicle.year)
                .replace('[month]', Number(vehicle.month).toString());

            await dispatch(createIndicatorUseCase(recordUid, 'selling_option_chosen', 1));
            window.open(replacedPrivateSellLink, '_parent');
        } else {
            await dispatch(createIndicatorUseCase(recordUid, 'selling_option_chosen', 2));
            history.push(`/record/${recordUid}`);
        }
    };

    return (
        <div className="page page-record" id="top">
            <Loader status={status}>
                <Container fluid>
                    <h1 className="text-center">
                        {t('appraisal_of')} {vehicle.makeName} {vehicle.modelName}
                    </h1>
                    <p className="text-center">
                        {t('your_file_number')} <strong>{offerNumber}</strong>
                    </p>

                    <Row className="mb-3">
                        <Col sm={6} className="text-center mb-3">
                            <div className="background-private-sell">
                                <Button
                                    target="_parent"
                                    onClick={() => trackAndNavigate('private-sell')}
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
                                <p
                                    className="small mt-3"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            t('valuation_footnote_html')?.replace(
                                                '[SITE_NAME]',
                                                siteName,
                                            ) || '',
                                    }}
                                />

                                <Button
                                    target="_parent"
                                    onClick={() => trackAndNavigate('private-sell')}
                                    className="mt-auto"
                                    block
                                >
                                    {t('place_an_ad')}
                                </Button>
                            </div>
                        </Col>
                        <Col sm={6} className="text-center mb-3">
                            <div className="background-direct-sell">
                                <Button
                                    block
                                    className="d-none d-sm-block"
                                    onClick={() => trackAndNavigate('direct-sell')}
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
                                <Button
                                    block
                                    onClick={() => trackAndNavigate('direct-sell')}
                                    className="mt-auto"
                                >
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
                </Container>
            </Loader>
        </div>
    );
};
