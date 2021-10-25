import React from 'react';

import { Col } from 'reactstrap';
import useTranslation from '../hooks/useTranslation';

type TIcon = 'bulb' | 'check' | 'clock' | 'cockade' | 'like' | 'lock' | 'sun' | 'target' | 'user';

type TFeatureProps = {
    label: string;
    icon: TIcon;
};
export const Feature: React.FC<TFeatureProps> = ({ label, icon }: TFeatureProps) => {
    const { t } = useTranslation();
    return (
        <Col>
            <div className={`feature feature-${icon}`}>{t(label)}</div>
        </Col>
    );
};
