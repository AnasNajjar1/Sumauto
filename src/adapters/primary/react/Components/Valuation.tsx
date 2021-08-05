import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, CardBody, Collapse, Container } from 'reactstrap';
import { TValuation, TVehicleNames } from '../../../../hexagon/interfaces';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';
import { t } from '../../../../hexagon/shared/utils/translate';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import './Themes/default.scss';

type TValuationProps = {
    valuation: TValuation;
    vehicle: TVehicleNames;
};

export const Valuation: FunctionComponent<TValuationProps> = ({ valuation, vehicle }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { client } = useSelector(getClientSelector);

    const { locale, currency } = client.config;

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Container fluid className="text-center">
            {valuation.status === true && (
                <>
                    <h3>{t('we_make_an_appointment')}</h3>
                    <div className="text-center">
                        <div>
                            {t('the_valuation_of_your')} {vehicle.makeName} {vehicle.modelName}
                        </div>
                        <div className="display-3 ">
                            {TextUtils.formatPrice(locale, currency, valuation.value)}
                        </div>
                        <p>{t('valuation_description')}</p>

                        <div className="info-box-valuation">
                            <div
                                className="resume"
                                role="button"
                                aria-hidden="true"
                                onClick={toggle}
                            >
                                {t('valuation_info')}
                            </div>
                            <Collapse isOpen={isOpen}>
                                <div className="details">{t('valuation_info_details')}</div>
                            </Collapse>
                        </div>
                    </div>
                </>
            )}
            {valuation.status === false && (
                <>
                    <h3>{t('no_quotation_message')}</h3>
                </>
            )}
        </Container>
    );
};
