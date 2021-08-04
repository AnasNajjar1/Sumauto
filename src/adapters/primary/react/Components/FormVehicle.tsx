import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Row } from 'reactstrap';
import { formVehicleOptions } from '../../../../config/config';
import { t } from '../../../../hexagon/shared/utils/translate';
import { saveVehicleAndUserInformations } from '../../../../hexagon/usecases/saveVehicleAndUserInformation/saveVehicleAndUserInformations';
import { getFormVehicleValue } from '../../view-models-generators/referentialSelectors';
import useVehicleForm from '../hooks/useVehicleForm';
import { ProgressMenu } from './ProgressMenu';

export const FormVehicle: FunctionComponent = () => {
    const { inputComponents, shouldDisplayQuestionsGroup, canQuote, validation, vehicleProgress } =
        useVehicleForm();
    const { vehicle } = useSelector(getFormVehicleValue);
    const dispatch = useDispatch();
    return (
        <Container fluid>
            <ProgressMenu step={1} progress={vehicleProgress()} />
            <div className="page page-formvehicle">
                <h1>{t('tell_us_about_your_car')}</h1>
                {formVehicleOptions.questionsGroup.map((group, key) => (
                    <div
                        key={group[0]}
                        className={
                            shouldDisplayQuestionsGroup(key)
                                ? 'questions-group'
                                : 'questions-group d-none'
                        }
                    >
                        {group.map((question) => (
                            <React.Fragment key={inputComponents[question]?.props.id}>
                                {inputComponents[question] &&
                                    React.createElement(
                                        inputComponents[question]?.component,
                                        inputComponents[question]?.props,
                                    )}
                            </React.Fragment>
                        ))}
                    </div>
                ))}

                {canQuote() && (
                    <div className="form-cta">
                        <Button block onClick={() => dispatch(saveVehicleAndUserInformations())}>
                            {t('value_your_car_now')}
                        </Button>
                    </div>
                )}

                {/* <hr />
                <Row>
                    <Col>
                        FormState : <pre>{JSON.stringify(vehicle, null, 2)}</pre>
                    </Col>

                    <Col>
                        validation : <pre>{JSON.stringify(validation, null, 2)}</pre>
                    </Col>
                </Row> */}
            </div>
        </Container>
    );
};
