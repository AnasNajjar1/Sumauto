import React, { FunctionComponent, Fragment, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
import { words } from 'lodash';
import { saveVehicleAndUserInformationsUseCase } from '../../../../hexagon/usecases/saveVehicleAndUserInformation/saveVehicleAndUserInformations.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import useVehicleForm from '../hooks/useVehicleForm';
import { CtaBlock } from './CtaBlock';
import { ProgressSteps } from './ProgressSteps/ProgressSteps';
import { Picture } from './Picture';
import { Incitation } from './Question/Incitation';
import { getFormVehicleValue } from '../../view-models-generators/referentialSelectors';

export const FormVehicle: FunctionComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { inputComponents, shouldDisplayQuestionsGroup, canQuote, vehicleProgress } =
        useVehicleForm();
    const { client } = useSelector(getClientSelector);

    const { id: recordId } = useSelector(getRecordSelector);

    const { vehicle } = useSelector(getFormVehicleValue);

    const [incitation, setIncitation] = useState<string>('');
    const [incitationTop, setIncitationTop] = useState<number>(0);

    const handleSubmitForm = () => {
        dispatch(saveVehicleAndUserInformationsUseCase());
    };

    useEffect(() => {
        const modelTop = document.getElementById('model')?.getBoundingClientRect().top || 0;

        const incitationCol =
            document.getElementById('incitation_col')?.getBoundingClientRect().top || 0;

        setIncitationTop(
            document.getElementById('model')?.getBoundingClientRect().top || 0 - window.scrollY,
        );
    }, [dispatch, vehicle.model]);
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
                    <Col id="incitation_col">
                        <Incitation top={incitationTop} />
                    </Col>
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
