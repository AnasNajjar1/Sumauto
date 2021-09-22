import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Col, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
import { TRecord } from '../../../../hexagon/interfaces';
import { CtaBlock } from './CtaBlock';
import { Feature } from './Feature';
import { FeatureGroup } from './FeatureGroup';
import { Picture } from './Picture';
import { VehicleInformations } from './VehicleInformations';

export const Valuation: React.FC<TRecord> = ({ vehicle }) => {
    const history = useHistory();
    return <>Valuation</>;
};
