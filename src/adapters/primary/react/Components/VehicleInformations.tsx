import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { TVehicleNames } from '../../../../hexagon/interfaces';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import useTranslation from '../hooks/useTranslation';

const VehiclePropLine: React.FC<{ label: string; value: string }> = ({ label, value }) => {
    const { t } = useTranslation();
    return (
        <Row>
            <Col>{t(label)}</Col>
            <Col>
                <strong>{value}</strong>
            </Col>
        </Row>
    );
};

type TVehicleProps = {
    vehicle: TVehicleNames;
};

export const VehicleInformations: React.FC<TVehicleProps> = ({ vehicle }: TVehicleProps) => {
    const { client } = useSelector(getClientSelector);
    const { locale } = client.config;
    const { t } = useTranslation();
    return (
        <div className="vehicle-informations">
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
                    {Number(vehicle.doors) > 0 && (
                        <VehiclePropLine label="door" value={vehicle.doors} />
                    )}
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
        </div>
    );
};
