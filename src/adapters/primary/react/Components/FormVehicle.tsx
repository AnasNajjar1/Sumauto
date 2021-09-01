import React, { FunctionComponent, Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
import { saveVehicleAndUserInformationsUseCase } from '../../../../hexagon/usecases/saveVehicleAndUserInformation/saveVehicleAndUserInformations.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import useVehicleForm from '../hooks/useVehicleForm';
import { CtaBlock } from './CtaBlock';
import { ProgressSteps } from './ProgressSteps/ProgressSteps';
import { Picture } from './Picture';
import { getFormVehicleValue } from '../../view-models-generators/referentialSelectors';

export const FormVehicle: FunctionComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { inputComponents, shouldDisplayQuestionsGroup, canQuote, vehicleProgress } =
        useVehicleForm();
    const { client } = useSelector(getClientSelector);

    const { id: recordId } = useSelector(getRecordSelector);

    const { vehicle } = useSelector(getFormVehicleValue);

    const handleSubmitForm = () => {
        dispatch(saveVehicleAndUserInformationsUseCase());
    };

    useEffect(() => {
        const encouragementVersion = document.getElementById('encouragement_version');
        const encouragementEmail = document.getElementById('encouragement_emailConfirmation');
        if (encouragementVersion) {
            if (vehicle.engine) {
                encouragementVersion.classList.remove('d-none');
            } else {
                encouragementVersion.classList.add('d-none');
            }
        }

        if (encouragementEmail) {
            if (vehicle.running) {
                encouragementEmail.classList.remove('d-none');
            } else {
                encouragementEmail.classList.add('d-none');
            }
        }
    }, [dispatch, vehicle]);
    useEffect(() => {
        if (recordId > 0) history.push(`./record/${recordId}`);
    }, [dispatch, recordId]);

    return (
        <Container fluid>
            <Row>
                <Col sm={9}>
                    <ProgressSteps currentStep={1} progress={vehicleProgress()} withLabels />
                </Col>
                <Col sm={3}>
                    <Picture background="steps" />
                </Col>
            </Row>
            <div className="page page-formvehicle">
                <h1>{t('tell_us_about_your_car')}</h1>

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
            </div>
        </Container>
    );
};
