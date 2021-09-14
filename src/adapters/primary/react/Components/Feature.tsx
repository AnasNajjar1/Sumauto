import React from 'react';
import { t } from 'autobiz-translate';

import { Col } from 'reactstrap';

type TIcon = 'bulb' | 'check' | 'clock' | 'cockade' | 'like' | 'lock' | 'sun' | 'target' | 'user';

type TFeatureProps = {
    label: string;
    icon: TIcon;
};
export const Feature: React.FC<TFeatureProps> = ({ label, icon }: TFeatureProps) => (
    <Col>
        <div className={`feature feature-${icon}`}>{t(label)}</div>
    </Col>
);
