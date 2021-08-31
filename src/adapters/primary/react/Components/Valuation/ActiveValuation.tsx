import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { t } from 'autobiz-translate';
import { Button } from 'reactstrap';
import { TRecord } from '../../../../../hexagon/interfaces';
import { TextUtils } from '../../../../../hexagon/shared/utils/TextUtils';
import { getClientSelector } from '../../../view-models-generators/clientSelector';
import { AccordionInfo } from '../AccordionInfo/AccordionInfo';
import { ProgressSteps } from '../ProgressSteps/ProgressSteps';

export const ActiveValuation: FunctionComponent<TRecord> = (props) => {
    const { client } = useSelector(getClientSelector);
    const { locale, currency } = client.config;
    const { vehicle, valuation, id } = props;

    return (
        <>
            <div className="text-center">
                <div>
                    {t('valuation_of_your_car')} {vehicle.makeName} {vehicle.modelName}
                </div>
                <div className="display-3 text-secondary">
                    {TextUtils.formatPrice(locale, currency, valuation.value)}
                </div>
                <p>{t('valuation.description')}</p>

                <AccordionInfo
                    iconType="circle"
                    titleKey="valuation_info"
                    detailsKey="valuation_info_details"
                />

                <p>
                    {t('your_file_number')} <strong>{id}</strong>
                </p>

                <div className="motivation">
                    <div className="motivation-title">{t('motivation_to_continue')}</div>
                    <ProgressSteps withLabels={false} currentStep={4} progress={75} />
                    <Button color="primary">{t('book_an_appointment')}</Button>
                </div>
            </div>
            <div className="alert-covid">
                <AccordionInfo
                    iconType="triangle"
                    titleKey="valuation_info"
                    detailsKey="valuation_info_details"
                />
            </div>
        </>
    );
};
