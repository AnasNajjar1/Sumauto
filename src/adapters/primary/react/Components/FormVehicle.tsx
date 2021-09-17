import React, { FunctionComponent, Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
import { saveVehicleAndUserInformationsUseCase } from '../../../../hexagon/usecases/saveVehicleAndUserInformation/saveVehicleAndUserInformations.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { CtaBlock } from './CtaBlock';
import { ProgressSteps } from './ProgressSteps/ProgressSteps';
import { Picture } from './Picture';
import useReferential from '../hooks/useReferential';
import { ReferentialSelect } from './ReferentialSelect';
import { TReferentialItem } from '../../../../hexagon/interfaces';
import {
    setCascade,
    setVehicleValue,
} from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { getReferentialList } from '../../../../hexagon/usecases/getReferentialList/getReferentialList';
import { Encouragement } from './Question/Encouragement';
import { getFilter } from '../../view-models-generators/referentialSelectors';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';

export const FormVehicle: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector(getFilter);

    let displayEncouragementVersion = false;
    let displaySectionMoreDetails = false;
    const displaySectionAdditionalInformation = false;

    if (filter.engine) displayEncouragementVersion = true;
    if (filter.body) displaySectionMoreDetails = true;

    let progress = 0;
    if (filter.make) progress = 6;
    if (filter.model) progress = 11;
    if (filter.month) progress = 17;
    if (filter.year) progress = 22;
    if (filter.fuel) progress = 28;
    if (filter.body) progress = 34;

    if (filter.door) progress = 40;
    if (filter.gear) progress = 46;
    if (filter.engine) progress = 52;
    if (filter.version) progress = 58;

    useReferential();

    return (
        <Container fluid>
            <Row className="progress-bar-section">
                <Col xs={12} sm={9}>
                    <ProgressSteps progress={progress} withLabels />
                </Col>
                <Col sm={3} className="d-none d-sm-block">
                    <Picture background="steps" />
                </Col>
            </Row>
            {/* ------------ */}
            <Row>
                <Col xs={12} sm={4} xl={3}>
                    <FormGroup className={`form-group-${'mileage'}`}>
                        <Label for="mileage">{'mileage' && t('mileage')}</Label>
                        <InputWithValidation>
                            <Input
                                type="number"
                                min="0"
                                className="form-control"
                                name="mileage"
                                key="mileage"
                                id="mileage"
                                defaultValue=""
                                // onBlur={(e) =>
                                //     dispatch(setVehicleValue('mileage', e.target.value))
                                // }
                            />
                            <InputValidation valid />
                        </InputWithValidation>
                    </FormGroup>
                </Col>
            </Row>
            {/* ------------ */}

            <div className="form-section">
                <div className="form-section-title">{t('basic_information')}</div>
                <Row>
                    <Col xs={12} sm={4} xl={3}>
                        <ReferentialSelect label="other_makes" scope="make" />
                    </Col>

                    <Col xs={12} sm={4} xl={3}>
                        <ReferentialSelect label="model" scope="model" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4} xl={3}>
                        <ReferentialSelect label="registration_date" scope="month" />
                    </Col>

                    <Col xs={12} sm={4} xl={3}>
                        <ReferentialSelect label="" scope="year" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={8}>
                        <p className="form-help">{t('registration_date_help')}</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4} xl={3}>
                        <ReferentialSelect label="fuel" scope="fuel" />
                    </Col>

                    <Col xs={12} sm={4} xl={3}>
                        <ReferentialSelect label="body" scope="body" />
                    </Col>
                </Row>
            </div>
            {displaySectionMoreDetails && (
                <div className="form-section">
                    <div className="form-section-title">{t('more_details')}</div>
                    <Row>
                        <Col xs={12} sm={4} xl={3}>
                            <ReferentialSelect label="door" scope="door" />
                        </Col>

                        <Col xs={12} sm={4} xl={3}>
                            <ReferentialSelect label="gear" scope="gear" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4} xl={3}>
                            <ReferentialSelect label="engine" scope="engine" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <p className="form-help">{t('engine_help')}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={8} xl={6}>
                            <ReferentialSelect label="version" scope="version" />
                            <p className="form-help">{t('version_help')}</p>
                        </Col>
                        <Col sm={4} xl={{ size: 3, offset: 2 }}>
                            <Encouragement
                                display={displayEncouragementVersion}
                                title={t('encouragement_version_title') || ''}
                                body={t('encouragement_version_body') || ''}
                            />
                        </Col>
                    </Row>
                </div>
            )}

            {displaySectionAdditionalInformation && (
                <div className="form-section">
                    <div className="form-section-title">{t('additional_information')}</div>
                </div>
            )}

            {/* <div className="page page-formvehicle">
                <h1>{t('we_value_your_car_for_free_in_less_than_2_minutes')}</h1>

                <Row>
                    <Col sm={8}>
                        {client.config.questionsGroup.map((group, key) => (
                            <div
                                key={group.title}
                                className={
                                    shouldDisplayQuestionsGroup(key)
                                        ? 'questions-group'
                                        : 'questions-group d-none'
                                }
                            >
                                <div className="col-12">
                                    <h2>{t(group.title)}</h2>
                                    <hr />
                                </div>
                                {group.questions.map((question) => (
                                    <Fragment key={inputComponents[question]?.props.id}>
                                        {inputComponents[question] &&
                                            React.createElement(
                                                inputComponents[question]?.component,
                                                inputComponents[question]?.props,
                                            )}
                                    </Fragment>
                                ))}
                            </div>
                        ))}
                    </Col>
                    <Col />
                </Row>
                <CtaBlock>
                    <Button disabled={!canQuote()} block onClick={handleSubmitForm}>
                        {t('value_your_car_now')}
                    </Button>
                </CtaBlock>
            </div> */}
        </Container>
    );
};
