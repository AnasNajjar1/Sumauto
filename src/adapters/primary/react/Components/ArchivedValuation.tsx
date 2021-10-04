import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Col, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
import { useHistory } from 'react-router';
import { TRecord } from '../../../../hexagon/interfaces';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { FeatureGroup } from './FeatureGroup';
import { Feature } from './Feature';
import { VehicleInformations } from './VehicleInformations';
import { Picture } from './Picture';
import { CtaBlock } from './CtaBlock';
import { resetRecordUseCase } from '../../../../hexagon/usecases/resetRecord/resetRecord.useCase';
import { duplicateRecordUseCase } from '../../../../hexagon/usecases/duplicateRecord/duplicateRecord.useCase';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';

export const ArchivedValuation: React.FC<TRecord> = (props) => {
    const { uid, vehicle, valuation, customer, offerNumber } = props;
    const { client } = useSelector(getClientSelector);

    const { uid: duplicateRecordUid } = useSelector(getRecordSelector);
    const { locale, currency } = client.config;
    const history = useHistory();
    const dispatch = useDispatch();

    const submitRefreshRecord = () => {
        dispatch(duplicateRecordUseCase(uid));
    };

    useEffect(() => {
        if (duplicateRecordUid.toString() !== uid) history.push(`/record/${duplicateRecordUid}`);
    }, [dispatch, duplicateRecordUid, history, uid]);

    const submitUpdateRecord = () => {
        dispatch(resetRecordUseCase());
        history.push('/');
    };

    return (
        <div className="page page-archive">
            <Container fluid>
                <Row>
                    <Col>
                        <h1>{t('archived_valuation_title')}</h1>
                        <p>
                            {t('your_file_number')}: <strong>{offerNumber}</strong>
                        </p>
                    </Col>
                    <Col className="d-none d-sm-block">
                        <Picture background="archive" />
                    </Col>
                </Row>

                <hr className="stick-background" />
                <Row>
                    <Col>
                        <div className="information-box">
                            <h2>{t('your_information')}</h2>
                            <p>
                                <strong>{t('email')}</strong>
                                <br />
                                {customer.email}
                            </p>
                            <p>
                                <strong>{t('zipCode')}</strong>
                                <br />
                                {customer.zipCode}
                            </p>
                        </div>
                    </Col>
                    {valuation && (
                        <Col>
                            <div className="valuation-box">
                                <h2>{t('your_valuation')}</h2>
                                <div className="valuation-value">
                                    {TextUtils.formatPrice(locale, currency, valuation.value)}
                                </div>
                                <p>
                                    <small>
                                        {t('valuation_date')}{' '}
                                        {TextUtils.formatDateNumeric(locale, valuation.date)}
                                    </small>
                                </p>
                            </div>
                        </Col>
                    )}
                </Row>
                <hr className="my-4" />

                <h2>{t('your_car')}</h2>
                <VehicleInformations vehicle={vehicle} />

                <CtaBlock>
                    <Row>
                        <Col>
                            <Button
                                block
                                className="refresh-valuation"
                                onClick={() => submitRefreshRecord()}
                            >
                                {t('refresh_valuation')}
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                block
                                className="modify-valuation"
                                onClick={() => submitUpdateRecord()}
                            >
                                {t('modify_valuation')}
                            </Button>
                        </Col>
                    </Row>
                </CtaBlock>

                <FeatureGroup>
                    <Feature label="personal_evaluation" icon="user" />
                    <Feature label="100_free" icon="like" />
                    <Feature label="without_obligation" icon="sun" />
                </FeatureGroup>
            </Container>
        </div>
    );
};
