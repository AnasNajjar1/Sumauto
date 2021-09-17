import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Label, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
import { getFormSelector } from '../../view-models-generators/formSelectors';
import { setVehicleValueCascade } from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';

const getMakeLogoUrl = (name: string) =>
    `https://b2b-pictures-prod.s3-eu-west-1.amazonaws.com/brandsLogos/${name.replace(
        / /g,
        '_',
    )}.jpg`;

export const MakeLogoInput: FunctionComponent = () => {
    const dispatch = useDispatch();

    const { referential, vehicle, vehicleName } = useSelector(getFormSelector);

    let makes;
    if (referential.make.status === 'succeeded' && referential.make.data[0]) {
        makes = referential.make.data[0].preferred;
    } else {
        return <></>;
    }

    const handleClick = (value: string) => {
        if (!vehicleName.make) dispatch(setVehicleValueCascade('make', value));
    };

    return (
        <div className="makes-logo">
            {/* <Col>
                <div className="registration-or-make-logo">
                    <span>{t('or')}</span>
                </div>
            </Col> */}
            <Label>{t('make')}</Label>
            <Row>
                {makes.map((f: any) => (
                    <Col key={f.id} xs={3} lg={2}>
                        <div className="make-logo-button-container">
                            <div
                                role={vehicleName.make ? 'none' : 'button'}
                                aria-hidden="true"
                                className={vehicle.make === f.id.toString() ? 'selected' : ''}
                                onClick={() => handleClick(f.id.toString())}
                            >
                                <img src={getMakeLogoUrl(f.name)} alt={f.name} />
                            </div>
                            {f.name}
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
