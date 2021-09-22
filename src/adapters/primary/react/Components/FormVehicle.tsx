import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, CustomInput } from 'reactstrap';
import { t } from 'autobiz-translate';
import { useHistory } from 'react-router';
import { ProgressSteps } from './ProgressSteps';
import { Picture } from './Picture';
import { ReferentialSelect } from './ReferentialSelect';
import { Message } from './Message';
import { getFormSelector } from '../../view-models-generators/formSelectors';
import { MileageInput } from './MileageInput';
import { ButtonRadioInput } from './ButtonRadioInput';
import { CtaBlock } from './CtaBlock';
import { ZipCodeInput } from './ZipCodeInput';
import { PhoneInput } from './PhoneInput';
import { EmailInput } from './EmailInput';
import { MakeLogoInput } from './MakeLogoInput';
import { saveVehicleAndUserInformationsUseCase } from '../../../../hexagon/usecases/saveVehicleAndUserInformation/saveVehicleAndUserInformations.useCase';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { getReferentialList } from '../../../../hexagon/usecases/getReferentialList/getReferentialList';
import { RegistrationInput } from './RegistrationInput';
import { setCascade } from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';

export const FormVehicle: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { vehicle, vehicleState, particular } = useSelector(getFormSelector);
    const { journeyType, config } = useSelector(getClientSelector).client;

    const { id: recordId, status: recordStatus } = useSelector(getRecordSelector);

    const [canQuote, setCanQuote] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [displaySectionMoreDetails, setDisplaySectionMoreDetails] = useState<boolean>(false);
    const [displaySectionAdditionalInformation, setDisplaySectionAdditionalInformation] =
        useState<boolean>(false);

    let displayEncouragementVersion = false;
    let displayEncouragementEmail = false;

    if (vehicle.engine) displayEncouragementVersion = true;
    if (vehicleState.running) displayEncouragementEmail = true;

    const handleSubmitForm = () => {
        dispatch(saveVehicleAndUserInformationsUseCase());
    };

    useEffect(() => {
        dispatch(
            setCascade([
                'make',
                'model',
                'month',
                'year',
                'fuel',
                'body',
                'door',
                'gear',
                'engine',
                'version',
            ]),
        );

        dispatch(getReferentialList('make'));
    }, [dispatch]);

    useEffect(() => {
        const basicInformations = [
            vehicle.make,
            vehicle.model,
            vehicle.month,
            vehicle.year,
            vehicle.fuel,
            vehicle.body,
        ];

        const moreDetails = [
            vehicle.door,
            vehicle.gear,
            vehicle.engine,
            vehicle.version,
            vehicle.mileage,
            vehicleState.imported,
        ];

        const additionalDetails = [
            vehicleState.history,
            vehicleState.running,
            vehicleState.sellProject,
            particular.email,
            particular.zipCode,
            particular.phone,
        ];

        setDisplaySectionMoreDetails(basicInformations.every(Boolean));
        setDisplaySectionAdditionalInformation(
            [displaySectionMoreDetails, ...moreDetails].every(Boolean),
        );
        setCanQuote(
            [displaySectionMoreDetails, ...moreDetails, ...additionalDetails].every(Boolean),
        );

        setProgress(
            (((basicInformations.filter(Boolean).length / basicInformations.length) * 1) / 3) *
                100 +
                (((moreDetails.filter(Boolean).length / moreDetails.length) * 1) / 3) * 100 +
                (((additionalDetails.filter(Boolean).length / additionalDetails.length) * 1) / 3) *
                    100,
        );
    }, [dispatch, vehicle, vehicleState, particular]);

    useEffect(() => {
        if (recordId > 0 && recordStatus === 'succeeded') {
            if (journeyType === 'valuation') history.push(`./switch/${recordId}`);
            else history.push(`./record/${recordId}`);
        }
    }, [dispatch, recordId, recordStatus]);

    return (
        <div className="page page-index">
            <Container fluid>
                <Row className="progress-bar-section">
                    <Col xs={12} sm={9}>
                        <ProgressSteps progress={progress} withLabels />
                    </Col>
                    <Col sm={3} className="d-none d-sm-block">
                        <Picture background="steps" />
                    </Col>
                </Row>

                <div className="form-section">
                    <div className="form-section-title">{t('basic_information')}</div>
                    <Row>
                        {config.displayRegistrationOption && (
                            <>
                                <Col xs={12} sm={5} xl={4}>
                                    <RegistrationInput />
                                </Col>
                                <Col xs={12} lg={1}>
                                    <div className="registration-or-make-logo">
                                        <span>{t('or')}</span>
                                    </div>
                                </Col>
                            </>
                        )}
                        <Col xs={12} sm={6} xl={5}>
                            <MakeLogoInput />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={8} lg={9}>
                            <Row>
                                <Col xs={12} sm={6} lg={4}>
                                    <ReferentialSelect label="other_makes" scope="make" />
                                </Col>

                                <Col xs={12} sm={6} lg={4}>
                                    <ReferentialSelect label="model" scope="model" />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} lg={4}>
                                    <ReferentialSelect label="registration_date" scope="month" />
                                </Col>

                                <Col xs={12} sm={6} lg={4}>
                                    <ReferentialSelect label="" scope="year" />
                                </Col>
                            </Row>
                            <p className="form-help">{t('registration_date_help')}</p>
                            <Row>
                                <Col xs={12} sm={6} lg={4}>
                                    <ReferentialSelect label="fuel" scope="fuel" />
                                </Col>

                                <Col xs={12} sm={6} lg={4}>
                                    <ReferentialSelect label="body" scope="body" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                {displaySectionMoreDetails && (
                    <div className="form-section">
                        <div className="form-section-title">{t('more_details')}</div>
                        <Row>
                            <Col xs={12} sm={8} lg={9}>
                                <Row>
                                    <Col xs={12} sm={6} lg={4}>
                                        <ReferentialSelect label="door" scope="door" />
                                    </Col>

                                    <Col xs={12} sm={6} lg={4}>
                                        <ReferentialSelect label="gear" scope="gear" />
                                    </Col>

                                    <Col xs={12} sm={6} lg={4}>
                                        <ReferentialSelect label="engine" scope="engine" />
                                    </Col>
                                </Row>

                                <p className="form-help">{t('engine_help')}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={8} lg={6}>
                                <ReferentialSelect label="version" scope="version" />
                                <p className="form-help">{t('version_help')}</p>
                            </Col>
                            <Col xs={12} sm={4} lg={{ size: 3, offset: 3 }}>
                                <Message
                                    className="info sm-absolute"
                                    display={displayEncouragementVersion}
                                    title={t('encouragement_version_title') || ''}
                                    body={t('encouragement_version_body') || ''}
                                />
                            </Col>
                        </Row>

                        <MileageInput />

                        <Row>
                            <Col xs={12} sm={8} lg={9}>
                                <Row>
                                    <Col xs={12} md={8} lg={6} xl={4}>
                                        <ButtonRadioInput
                                            label="imported"
                                            id="imported"
                                            data={[
                                                { name: 'yes', value: '1' },
                                                { name: 'no', value: '2' },
                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <p className="form-help">{t('import_help')}</p>
                            </Col>
                        </Row>
                    </div>
                )}
                {displaySectionAdditionalInformation && (
                    <div className="form-section">
                        <div className="form-section-title">{t('additional_information')}</div>
                        <Row>
                            <Col xs={12} sm={8} lg={9}>
                                <Row>
                                    <Col xs={12} md={8} lg={6} xl={4}>
                                        <ButtonRadioInput
                                            label="history"
                                            id="history"
                                            data={[
                                                { name: 'yes', value: '1' },
                                                { name: 'no', value: '2' },
                                            ]}
                                        />
                                    </Col>
                                    <Col xs={12} md={8} lg={6} xl={4}>
                                        <ButtonRadioInput
                                            label="running"
                                            id="running"
                                            data={[
                                                { name: 'yes', value: '1' },
                                                { name: 'no', value: '2' },
                                            ]}
                                        />
                                    </Col>
                                    <Col xs={12} md={12} lg={12} xl={8}>
                                        <ButtonRadioInput
                                            label="sellProject"
                                            id="sellProject"
                                            data={[
                                                { name: '1-3_weeks', value: '1' },
                                                { name: '1_month', value: '2' },
                                                { name: '3_months', value: '3' },
                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={8} lg={9} xl={6}>
                                <Row>
                                    <Col xs={12}>
                                        <EmailInput />
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <ZipCodeInput />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <PhoneInput />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} sm={4} lg={3} xl={{ size: 3, offset: 3 }}>
                                <Message
                                    className="info sm-absolute"
                                    display={displayEncouragementEmail}
                                    title={t('encouragement_email_title') || ''}
                                    body={t('encouragement_email_running_body') || ''}
                                />
                            </Col>
                        </Row>
                        <p className="small">
                            {t('i_have_read_the')}{' '}
                            <a href={config.pdfPrivacyLink} target="_blank" rel="noreferrer">
                                {t('policy_of_privacy')}
                            </a>
                        </p>
                    </div>
                )}

                <CtaBlock>
                    <Button disabled={!canQuote} onClick={handleSubmitForm}>
                        {t('value_your_car_now')}
                    </Button>
                </CtaBlock>
            </Container>
        </div>
    );
};
