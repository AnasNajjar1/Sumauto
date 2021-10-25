import React, { useState } from 'react';

import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import useTranslation from '../hooks/useTranslation';

type TIcon = 'circle' | 'triangle';

type TAccordionInfoProps = {
    titleKey: string;
    detailsKey: string;
    iconType: TIcon;
};
export const AccordionInfo: React.FC<TAccordionInfoProps> = ({
    titleKey,
    detailsKey,
    iconType,
}: TAccordionInfoProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { t } = useTranslation();
    return (
        <div className="accordion-info">
            <div className="accordion-info-title" role="button" aria-hidden="true" onClick={toggle}>
                <span className="accordion-info-title-icon">
                    {iconType === 'circle' && <FontAwesomeIcon icon={faInfoCircle} />}
                    {iconType === 'triangle' && <FontAwesomeIcon icon={faExclamationTriangle} />}
                </span>{' '}
                <span className="accordion-info-title-text">{t(titleKey)}</span>
            </div>
            <Collapse isOpen={isOpen}>
                <div className="accordion-info-details">{t(detailsKey)}</div>
            </Collapse>
        </div>
    );
};
