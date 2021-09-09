import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
// import { t } from '../../../../../hexagon/shared/utils/translate';
import { TRecord } from '../../../../../hexagon/interfaces';
import { CtaBlock } from '../CtaBlock';
import { Feature } from '../Feature';
import { FeatureGroup } from '../FeatureGroup';
import { Picture } from '../Picture';
import { VehicleInformations } from '../VehicleInformations';

export const NoValuation: FunctionComponent<TRecord> = ({ vehicle }) => {
    const history = useHistory();
    return (
        <>
            <Row>
                <Col>
                    <h1>{t('no_valuation.title')}</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <p>{t('no_valuation.message')}</p>
                </Col>
                <Col sm={4} className="d-none d-sm-block">
                    <Picture background="searching" />
                </Col>
            </Row>

            <VehicleInformations vehicle={vehicle} />

            <CtaBlock>
                <Button color="primary" onClick={() => history.push('/')}>
                    {t('start_over_my_valuation')}
                </Button>
            </CtaBlock>

            <FeatureGroup>
                <Feature label="personal_evaluation" icon="user" />
                <Feature label="100_free" icon="like" />
                <Feature label="without_obligation" icon="sun" />
            </FeatureGroup>
        </>
    );
};
