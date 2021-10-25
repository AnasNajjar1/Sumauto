import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Row } from 'reactstrap';
import { getFormSelector } from '../../view-models-generators/formSelectors';
import { setVehicleValueCascade } from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { TRefrentialElement } from '../../../../hexagon/interfaces';
import useTranslation from '../hooks/useTranslation';

const getMakeLogoUrl = (name: string) =>
    `https://b2b-pictures-prod.s3-eu-west-1.amazonaws.com/brandsLogos/${name
        .replace(/ /g, '_')
        .toUpperCase()}.jpg`;

export const MakeLogoInput: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { referential, vehicle, vehicleName } = useSelector(getFormSelector);

    let makes;
    if (referential.make.status === 'succeeded' && referential.make.data[0]) {
        makes = referential.make.data.preferred;
    } else {
        return <></>;
    }

    const handleClick = (value: string) => {
        if (!vehicleName.make) dispatch(setVehicleValueCascade('make', value));
    };

    return (
        <div className="makes-logo" id="form_group_make">
            {makes.length > 0 && (
                <>
                    <Label>{t('preferred_makes')}</Label>
                    <Row className="fivecol-container">
                        {makes.map((f: TRefrentialElement) => (
                            <div key={f.id} className="fivecol">
                                <div className="make-logo-button-container">
                                    <div
                                        role={vehicleName.make ? 'none' : 'button'}
                                        aria-hidden="true"
                                        className={
                                            vehicle.make === f.id.toString() ? 'selected' : ''
                                        }
                                        onClick={() => handleClick(f.id.toString())}
                                    >
                                        <img src={getMakeLogoUrl(f.name)} alt={f.name} />
                                    </div>
                                    {f.name}
                                </div>
                            </div>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
};
