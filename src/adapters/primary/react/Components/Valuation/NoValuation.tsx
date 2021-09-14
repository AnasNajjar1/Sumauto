import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
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
                <Col sm={8}>
                    <h1>{t('no_valuation_title')}</h1>

                    <div className="d-block d-sm-none mb-4">
                        <Picture background="searching" />
                    </div>
                    <p>{t('no_valuation_message')}</p>

                    <div className="d-none d-lg-block">
                        <VehicleInformations vehicle={vehicle} />
                    </div>
                </Col>
                <Col sm={4} className="d-none d-sm-block">
                    <div className="mt-lg-5">
                        <Picture background="searching" />
                    </div>
                </Col>
            </Row>
            <hr />

            <div className="d-block d-lg-none">
                <VehicleInformations vehicle={vehicle} />
            </div>

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
