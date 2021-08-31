import { t } from 'autobiz-translate';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { TVehicleNames } from '../../../../hexagon/interfaces';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';
import { getClientSelector } from '../../view-models-generators/clientSelector';

const VehiclePropLine: FunctionComponent<{ label: string; value: string }> = ({ label, value }) => (
    <Row>
        <Col>{t(label)}</Col>
        <Col>
            <strong>{value}</strong>
        </Col>
    </Row>
);

type TVehicleProps = {
    vehicle: TVehicleNames;
};

export const VehicleInformations: React.FC<TVehicleProps> = ({ vehicle }: TVehicleProps) => {
    const { client } = useSelector(getClientSelector);
    const { locale } = client.config;
    return (
        <>
            <Row>
                <Col>
                    <hr />
                    <h2>{t('your_car')}</h2>
                </Col>
            </Row>

            <Row>
                <Col xs={12} sm={6}>
                    <VehiclePropLine label="make" value={vehicle.makeName} />
                    <VehiclePropLine label="model" value={vehicle.modelName} />
                    <VehiclePropLine
                        label="mileage"
                        value={TextUtils.formatNumber(locale, vehicle.mileage)}
                    />
                </Col>
                <Col xs={12} sm={6}>
                    <VehiclePropLine label="gear" value={vehicle.gearName} />
                    <VehiclePropLine label="fuel" value={vehicle.fuelName} />
                    <VehiclePropLine label="doors" value={vehicle.doors} />
                </Col>
            </Row>
            <Row>
                <Col xs={6} sm={3}>
                    {t('version')}
                </Col>
                <Col>
                    <strong>{vehicle.versionName}</strong>
                </Col>
            </Row>
        </>
    );
};
