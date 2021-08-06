import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse } from 'reactstrap';
import { TRecord } from '../../../../../hexagon/interfaces';
import { TextUtils } from '../../../../../hexagon/shared/utils/TextUtils';
import { t } from '../../../../../hexagon/shared/utils/translate';
import { getClientSelector } from '../../../view-models-generators/clientSelector';

export const ActiveValuation: FunctionComponent<TRecord> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { client } = useSelector(getClientSelector);
    const { locale, currency } = client.config;
    const toggle = () => setIsOpen(!isOpen);
    const { vehicle, valuation } = props;

    return (
        <div className="text-center">
            <div>
                {t('the_valuation_of_your')} {vehicle.makeName} {vehicle.modelName}
            </div>
            <div className="display-3 ">
                {TextUtils.formatPrice(locale, currency, valuation.value)}
            </div>
            <p>{t('valuation_description')}</p>

            <div className="info-box-valuation">
                <div className="resume" role="button" aria-hidden="true" onClick={toggle}>
                    {t('valuation_info')}
                </div>
                <Collapse isOpen={isOpen}>
                    <div className="details">{t('valuation_info_details')}</div>
                </Collapse>
            </div>
        </div>
    );
};
