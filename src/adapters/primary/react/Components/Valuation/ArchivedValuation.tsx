import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
import { TRecord } from '../../../../../hexagon/interfaces';
import { TextUtils } from '../../../../../hexagon/shared/utils/TextUtils';
import { getClientSelector } from '../../../view-models-generators/clientSelector';
import { FeatureGroup } from '../FeatureGroup';
import { Feature } from '../Feature';
import { VehicleInformations } from '../VehicleInformations';
import { Picture } from '../Picture';
import { CtaBlock } from '../CtaBlock';

export const ArchivedValuation: FunctionComponent<TRecord> = (props) => {
    const { id, vehicle, valuation, customer } = props;
    const { client } = useSelector(getClientSelector);
    const { locale, currency } = client.config;
    return (
        <>
            <Row>
                <Col>
                    <h1>{t('archived_valuation_title')}</h1>
                    <p>
                        {t('your_file_number')}: <strong>{id}</strong>
                    </p>
                </Col>
                <Col className="d-none d-sm-block">
                    <Picture background="archive" />
                </Col>
            </Row>

            <hr className="stick-background" />
            <Row>
                <Col>
                    <div className="information-box">
                        <h2>{t('your_information')}</h2>
                        <p>
                            <strong>{t('email')}</strong>
                            <br />
                            {customer.email}
                        </p>
                        <p>
                            <strong>{t('zipCode')}</strong>
                            <br />
                            {customer.zipCode}
                        </p>
                    </div>
                </Col>
                <Col>
                    <div className="quotation-box">
                        <h2>{t('your_quotation')}</h2>
                        <div className="quotation-value">
                            {TextUtils.formatPrice(locale, currency, valuation.value)}
                        </div>
                        <p>
                            <small>
                                {t('quotation_date')}{' '}
                                {TextUtils.formatDateNumeric(locale, valuation.date)}
                            </small>
                        </p>
                    </div>
                </Col>
            </Row>
            <hr className="my-4" />

            <h2>{t('your_car')}</h2>
            <VehicleInformations vehicle={vehicle} />

            <CtaBlock>
                <Row>
                    <Col>
                        <Button block className="refresh-valuation">
                            {t('refresh_valuation')}
                        </Button>
                    </Col>
                    <Col>
                        <Button block className="modify-valuation">
                            {t('modify_valuation')}
                        </Button>
                    </Col>
                </Row>
            </CtaBlock>

            <FeatureGroup>
                <Feature label="personal_evaluation" icon="user" />
                <Feature label="100_free" icon="like" />
                <Feature label="without_obligation" icon="sun" />
            </FeatureGroup>
        </>
    );
};
