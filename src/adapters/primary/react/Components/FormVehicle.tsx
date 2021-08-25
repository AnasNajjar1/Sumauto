import React, { FunctionComponent, Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { t } from 'autobiz-translate';
import { saveVehicleAndUserInformations } from '../../../../hexagon/usecases/saveVehicleAndUserInformation/saveVehicleAndUserInformations';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import useVehicleForm from '../hooks/useVehicleForm';
import { CtaBlock } from './CtaBlock';
import { ProgressMenu } from './ProgressMenu';

export const FormVehicle: FunctionComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { inputComponents, shouldDisplayQuestionsGroup, canQuote, vehicleProgress } =
        useVehicleForm();
    const { client } = useSelector(getClientSelector);

    const { id: recordId } = useSelector(getRecordSelector);

    const handleSubmitForm = () => {
        dispatch(saveVehicleAndUserInformations());
        if (recordId > 0) {
            history.push(`./record/${recordId}`);
        }
    };
    return (
        <Container fluid>
            <ProgressMenu step={1} progress={vehicleProgress()} />

            <div className="page page-formvehicle">
                <h1>{t('tell_us_about_your_car')}</h1>

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
                <CtaBlock>
                    <Button disabled={!canQuote()} block onClick={handleSubmitForm}>
                        {t('value_your_car_now')}
                    </Button>
                </CtaBlock>
            </div>
        </Container>
    );
};
