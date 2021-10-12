import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { t } from 'autobiz-translate';
import { useHistory } from 'react-router';
import TagManager from 'react-gtm-module';
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
import { sellDelay } from '../../../../config';
import useScroll from '../hooks/useScroll';

export const FormVehicle: React.FC = () => {
    const dispatch = useDispatch();
    const historyHook = useHistory();
    const { scrollToElement } = useScroll();
    const { vehicle, vehicleState, particular, checkFormValid, checkZipCode } =
        useSelector(getFormSelector);
    const { journeyType, config } = useSelector(getClientSelector).client;

    const { uid: recordUid, status: recordStatus } = useSelector(getRecordSelector);

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
        setCanQuote(false);
        // TagManager.dataLayer({
        //     dataLayer: {
        //         event: 'step4_validate',
        //         step: 'form/validation_formulaire',
        //     },
        // });
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

        // TagManager.dataLayer({
        //     dataLayer: {
        //         event: 'step1_validate',
        //         step: 'form/information_de_base',
        //     },
        // });
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
            // vehicleState.sellProject, // not required
            particular.email,
            particular.zipCode,
            // particular.phone,// not required
        ];

        setDisplaySectionMoreDetails(basicInformations.every(Boolean));

        setDisplaySectionAdditionalInformation(
            [displaySectionMoreDetails, ...moreDetails].every(Boolean),
        );

        setCanQuote(
            [displaySectionMoreDetails, ...moreDetails, ...additionalDetails].every(Boolean) &&
                checkFormValid &&
                checkZipCode,
        );

        setProgress(
            (((basicInformations.filter(Boolean).length / basicInformations.length) * 1) / 3) *
                100 +
                (((moreDetails.filter(Boolean).length / moreDetails.length) * 1) / 3) * 100 +
                (((additionalDetails.filter(Boolean).length / additionalDetails.length) * 1) / 3) *
                    100,
        );
    }, [dispatch, vehicle, vehicleState, particular, checkZipCode, checkFormValid]);

    // useEffect(() => {
    //     if (displaySectionMoreDetails) {
    //         TagManager.dataLayer({
    //             dataLayer: {
    //                 event: 'step2_validate',
    //                 step: 'form/mes_details',
    //             },
    //         });
    //     }
    // }, [dispatch, displaySectionMoreDetails]);

    // useEffect(() => {
    //     if (displaySectionAdditionalInformation) {
    //         TagManager.dataLayer({
    //             dataLayer: {
    //                 event: 'step3_validate',
    //                 step: 'form/information_additionnelle',
    //             },
    //         });
    //     }
    // }, [dispatch, displaySectionAdditionalInformation]);

    useEffect(() => {
        if (recordUid && recordStatus === 'saved') {
            if (journeyType === 'valuation') historyHook.push(`./switch/${recordUid}`);
            else historyHook.push(`./record/${recordUid}`);
        }
    }, [dispatch, recordUid, recordStatus, journeyType, historyHook]);

    useEffect(() => {
        if (vehicle.model === '') scrollToElement('form_group_model', 15);
        else if (vehicle.month === '') scrollToElement('form_group_month', 15);
        else if (vehicle.year === '') scrollToElement('form_group_month', 15);
        else if (vehicle.fuel === '') scrollToElement('form_group_fuel', 15);
        else if (vehicle.body === '') scrollToElement('form_group_body', 15);
        else if (vehicle.door === '') scrollToElement('form_group_door', 15);
        else if (vehicle.gear === '') scrollToElement('form_group_gear', 15);
        else if (vehicle.engine === '') scrollToElement('form_group_engine', 15);
        else if (vehicle.version === '') scrollToElement('form_group_version', 15);
        else if (vehicle.mileage === '') scrollToElement('form_group_mileage', 15);
        // else if (!vehicleState.imported) scrollToElement('form_group_imported', 15);
        else if (!vehicleState.history) scrollToElement('form_group_history', 15);
        else if (!vehicleState.running) scrollToElement('form_group_running', 15);
        else if (!vehicleState.sellProject) scrollToElement('form_group_sellProject', 15);
    }, [dispatch, vehicle, vehicleState, scrollToElement]);

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
                        <Col xs={12} sm={8} md={6} lg={5} xl={4}>
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
                                    <ReferentialSelect
                                        label="registration_date"
                                        scope="month"
                                        tooltip
                                    />
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
                    <div className="form-section" id="more_details">
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
                                        <ReferentialSelect label="engine" scope="engine" tooltip />
                                    </Col>
                                </Row>

                                <p className="form-help">{t('engine_help')}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={8} lg={6}>
                                <ReferentialSelect label="version" scope="version" tooltip />
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
                                            tooltip
                                            data={[
                                                { name: 'yes', value: 'yes' },
                                                { name: 'no', value: 'no' },
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
                    <div className="form-section" id="additional_information">
                        <div className="form-section-title">{t('additional_information')}</div>
                        <Row>
                            <Col xs={12} sm={8} lg={9}>
                                <Row>
                                    <Col xs={12} md={8} lg={6} xl={5}>
                                        <ButtonRadioInput
                                            label="history"
                                            id="history"
                                            data={[
                                                { name: 'yes', value: 'yes' },
                                                { name: 'no', value: 'no' },
                                            ]}
                                        />
                                    </Col>
                                    <Col xs={12} md={8} lg={6} xl={5}>
                                        <ButtonRadioInput
                                            label="running"
                                            id="running"
                                            data={[
                                                { name: 'yes', value: 'yes' },
                                                { name: 'no', value: 'no' },
                                            ]}
                                        />
                                    </Col>
                                    <Col xs={12} md={12} lg={12} xl={8}>
                                        <ButtonRadioInput
                                            label="sellProject"
                                            id="sellProject"
                                            data={sellDelay}
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
                                        <PhoneInput required={false} />
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
                <p className="footnote">{t('form_vehicle_footnote')}</p>
            </Container>
        </div>
    );
};
