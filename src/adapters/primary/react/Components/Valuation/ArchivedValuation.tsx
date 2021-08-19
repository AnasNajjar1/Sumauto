import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
import { TRecord } from '../../../../../hexagon/interfaces';
import { TextUtils } from '../../../../../hexagon/shared/utils/TextUtils';
import { getClientSelector } from '../../../view-models-generators/clientSelector';

export const ArchivedValuation: FunctionComponent<TRecord> = (props) => {
    const { id, vehicle, valuation } = props;
    const { client } = useSelector(getClientSelector);
    const { locale, currency } = client.config;
    return (
        <>
            <p>{t('your_quotation_is_archived')}</p>
            <p>
                {t('file_number')} {id}
            </p>
            <hr />
            <Row>
                <Col>Apppointment info</Col>
                <Col>
                    <p>{t('your_quotation')}</p>
                    {TextUtils.formatPrice(locale, currency, valuation.value)}
                    <p>
                        {t('quotation_date')} {TextUtils.formatDateNumeric(locale, valuation.date)}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{t('your_car')}</p>
                    <p>
                        {t('make')}: <strong>{vehicle.makeName}</strong>
                        <br />
                        {t('model')}: <strong>{vehicle.modelName}</strong>
                        <br />
                        {t('mileage')}: <strong>{vehicle.mileage}</strong>
                    </p>
                </Col>
            </Row>
        </>
    );
};
