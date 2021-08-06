import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { TRecord } from '../../../../../hexagon/interfaces';
import { TextUtils } from '../../../../../hexagon/shared/utils/TextUtils';
import { t } from '../../../../../hexagon/shared/utils/translate';
import { getClientSelector } from '../../../view-models-generators/clientSelector';
import { CtaBlock } from '../CtaBlock';

const VehiclePropLine: FunctionComponent<{ label: string; value: string }> = ({ label, value }) => (
    <Row>
        <Col>{t(label)}</Col>
        <Col>
            <strong>{value}</strong>
        </Col>
    </Row>
);

export const NoValuation: FunctionComponent<TRecord> = ({ vehicle }) => {
    const { client } = useSelector(getClientSelector);
    const { locale } = client.config;
    return (
        <>
            <h1>{t('your_car_is_not_quotable')}</h1>
            <p>{t('your_car_is_not_quotable_details')}</p>
            <hr />
            <h2>{t('your_car')}</h2>
            <Row>
                <Col xs={12} sm={6}>
                    <VehiclePropLine label={t('make')} value={vehicle.makeName} />
                    <VehiclePropLine label={t('model')} value={vehicle.modelName} />
                    <VehiclePropLine
                        label={t('registration')}
                        value={`${vehicle.monthName} ${vehicle.yearName}`}
                    />
                    <VehiclePropLine label={t('fuel')} value={vehicle.fuelName} />
                    <VehiclePropLine label={t('body')} value={vehicle.bodyName} />
                </Col>
                <Col xs={12} sm={6}>
                    <VehiclePropLine label={t('gear')} value={vehicle.gearName} />
                    <VehiclePropLine
                        label={t('mileage')}
                        value={TextUtils.formatNumber(locale, vehicle.mileage)}
                    />
                    <VehiclePropLine
                        label={t('imported_car')}
                        value={vehicle.import ? t('yes') : t('no')}
                    />
                    <Row>
                        <Col>{t('version')}</Col>
                    </Row>
                    <Row>
                        <Col>
                            <strong>{vehicle.versionName}</strong>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <CtaBlock>
                <Button color="primary">{t('start_over_my_valuation')}</Button>
            </CtaBlock>
        </>
    );
};
