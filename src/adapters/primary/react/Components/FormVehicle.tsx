import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Spinner, FormGroup, Input, Label } from 'reactstrap';
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
import {
    setCascade,
    setVehicleValueCascade,
} from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { sellDelay } from '../../../../config';
import useScroll from '../hooks/useScroll';
import useTranslation from '../hooks/useTranslation';
import useTracker from '../hooks/useTracker';
import { SimpleInput } from './SimpleInput';
import { setVehicleStateValue } from '../../../../hexagon/usecases/setVehicleStateValue/setVehicleStateValue.useCase';
import { setParticularValue } from '../../../../hexagon/usecases/setParticularValue/setParticularValue.useCase';

export const FormVehicle: React.FC = () => {
    const dispatch = useDispatch();
    const historyHook = useHistory();
    const { scrollToElement } = useScroll();
    const { t } = useTranslation();
    const { vehicle, vehicleState, particular, checkFormValid, checkZipCode } =
        useSelector(getFormSelector);
    const { journeyType, config } = useSelector(getClientSelector).client;

    const { uid: recordUid, status: recordStatus } = useSelector(getRecordSelector);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({});
    const [canQuote, setCanQuote] = useState<boolean>(false);
    const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);
    const [trySubmit, setTrySubmit] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [displaySectionMoreDetails, setDisplaySectionMoreDetails] = useState<boolean>(false);
    const [displaySectionAdditionalInformation, setDisplaySectionAdditionalInformation] =
        useState<boolean>(false);

    let displayEncouragementVersion = false;
    let displayEncouragementEmail = false;
    useTracker(
        vehicle,
        vehicleState,
        particular,
        displaySectionMoreDetails,
        displaySectionAdditionalInformation,
        privacyChecked,
        canQuote,
        submitting,
    );
    if (vehicle.engine) displayEncouragementVersion = true;
    if (vehicleState.running) displayEncouragementEmail = true;

    const handleSubmitForm = () => {
        if (canQuote) {
            dispatch(saveVehicleAndUserInformationsUseCase());
            setSubmitting(true);
            setCanQuote(false);
        }

        setTrySubmit(true);
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
            particular.email,
            particular.zipCode,
        ];

        setDisplaySectionMoreDetails(basicInformations.every(Boolean));

        setDisplaySectionAdditionalInformation(
            [displaySectionMoreDetails, ...moreDetails].every(Boolean),
        );
        let checkVoi = true;
        if (vehicleState.running === 'no') {
            checkVoi = vehicleState.notRollingDescription && vehicleState.notRollingReason;
        }

        setCanQuote(
            [displaySectionMoreDetails, ...moreDetails, ...additionalDetails].every(Boolean) &&
                checkFormValid &&
                checkZipCode &&
                checkVoi &&
                privacyChecked,
        );

        setProgress(
            (((basicInformations.filter(Boolean).length / basicInformations.length) * 1) / 3) *
                100 +
                (((moreDetails.filter(Boolean).length / moreDetails.length) * 1) / 3) * 100 +
                (((additionalDetails.filter(Boolean).length / additionalDetails.length) * 1) / 3) *
                    100,
        );
    }, [dispatch, vehicle, vehicleState, particular, checkZipCode, checkFormValid, privacyChecked]);

    useEffect(() => {
        if (recordUid && recordStatus === 'saved') {
            if (journeyType === 'valuation') historyHook.push(`./switch/${recordUid}`);
            else historyHook.push(`./record/${recordUid}`);
        }
    }, [dispatch, recordUid, recordStatus, journeyType, historyHook]);

    useEffect(() => {
        if (!vehicle.make && trySubmit) scrollToElement('form_group_make', 45);
        else if (vehicle.model === '') scrollToElement('form_group_model', 45);
        else if (vehicle.month === '') scrollToElement('form_group_month', 45);
        else if (vehicle.year === '') scrollToElement('form_group_month', 45);
        else if (vehicle.fuel === '') scrollToElement('form_group_fuel', 45);
        else if (vehicle.body === '') scrollToElement('form_group_body', 45);
        else if (vehicle.door === '') scrollToElement('form_group_door', 45);
        else if (vehicle.gear === '') scrollToElement('form_group_gear', 45);
        else if (vehicle.engine === '') scrollToElement('form_group_engine', 45);
        else if (vehicle.version === '') scrollToElement('form_group_version', 45);
        else if (!vehicle.mileage) scrollToElement('form_group_mileage', 45);
        else if (!vehicleState.imported) scrollToElement('form_group_imported', 45);
        else if (!vehicleState.history) scrollToElement('form_group_history', 45);
        else if (!vehicleState.running) scrollToElement('form_group_running', 45);
        else if (vehicleState.running === 'yes' && !vehicleState.purchaseProject)
            scrollToElement('form_group_purchaseProject', 45);
        else if (vehicleState.running === 'no' && !vehicleState.notRollingReason)
            scrollToElement('form_group_notRollingReason', 45);
        else if (vehicleState.running === 'no' && !vehicleState.notRollingDescription)
            scrollToElement('form_group_notRollingDescription', 45);
        else if (!particular.email) scrollToElement('form_group_email', 45);
        else if (!particular.zipCode) scrollToElement('form_group_zipCode', 45);

        setTrySubmit(false);
    }, [dispatch, vehicle, vehicleState, scrollToElement, trySubmit]);

    useEffect(() => {
        if (trySubmit) {
            setErrors({
                model: !vehicle.model,
                month: !vehicle.month,
                year: !vehicle.year,
                version: !vehicle.version,
                fuel: !vehicle.fuel,
                body: !vehicle.body,
                door: !vehicle.door,
                gear: !vehicle.gear,
                engine: !vehicle.engine,
                mileage: !vehicle.mileage,
                import: !vehicleState.imported,
                history: !vehicleState.history,
                running: !vehicleState.running,
                notRollingReason: vehicleState.running === 'no' && !vehicleState.notRollingReason,
                notRollingDescription:
                    vehicleState.running === 'no' && !vehicleState.notRollingDescription,
                email: !particular.email,
                zipCode: !particular.zipCode,
                privacy: !privacyChecked,
            });
        }
    }, [dispatch, trySubmit, vehicle]);

    if (submitting) {
        return (
            <div className="page page-index">
                <div className="my-5 py-5 text-center">
                    <Spinner />
                </div>
            </div>
        );
    }

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
                                    <ReferentialSelect
                                        label="model"
                                        scope="model"
                                        error={errors.model}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} lg={4}>
                                    <ReferentialSelect
                                        label="registration_date"
                                        scope="month"
                                        tooltip={t('registration_date_help')}
                                        error={errors.month}
                                    />
                                </Col>

                                <Col xs={12} sm={6} lg={4}>
                                    <ReferentialSelect label="" scope="year" error={errors.year} />
                                </Col>
                            </Row>
                            <p className="form-help">{t('registration_date_help')}</p>
                            <Row>
                                <Col xs={12} sm={6} lg={4}>
                                    <ReferentialSelect
                                        label="fuel"
                                        scope="fuel"
                                        error={errors.fuel}
                                    />
                                </Col>

                                <Col xs={12} sm={6} lg={4}>
                                    <ReferentialSelect
                                        label="body"
                                        scope="body"
                                        error={errors.body}
                                    />
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
                                        <ReferentialSelect
                                            label="door"
                                            scope="door"
                                            error={errors.door}
                                        />
                                    </Col>

                                    <Col xs={12} sm={6} lg={4}>
                                        <ReferentialSelect
                                            label="gear"
                                            scope="gear"
                                            error={errors.gear}
                                        />
                                    </Col>

                                    <Col xs={12} sm={6} lg={4}>
                                        <ReferentialSelect
                                            label="engine"
                                            scope="engine"
                                            tooltip={t('engine_help')}
                                            error={errors.engine}
                                        />
                                    </Col>
                                </Row>

                                <p className="form-help">{t('engine_help')}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={8} lg={6}>
                                <ReferentialSelect
                                    label="version"
                                    scope="version"
                                    tooltip={t('version_help')}
                                    error={errors.version}
                                />
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

                        <MileageInput error={errors.mileage} />

                        <Row>
                            <Col xs={12} sm={8} lg={9}>
                                <Row>
                                    <Col xs={12} md={8} lg={6} xl={4}>
                                        <ButtonRadioInput
                                            label="imported"
                                            id="imported"
                                            tooltip={t('import_help')}
                                            data={[
                                                { name: 'yes', value: 'yes' },
                                                { name: 'no', value: 'no' },
                                            ]}
                                            error={errors.import}
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
                                            error={errors.history}
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
                                            error={errors.running}
                                        />
                                    </Col>
                                    {vehicleState.running === 'no' && (
                                        <Col xs={12} md={12} lg={12} xl={8}>
                                            <ButtonRadioInput
                                                label="notRollingReason"
                                                id="notRollingReason"
                                                data={[
                                                    {
                                                        name: 'seriousDammage',
                                                        value: 'seriousDammage',
                                                    },
                                                    {
                                                        name: 'accidentWithDammage',
                                                        value: 'accidentWithDammage',
                                                    },
                                                    { name: 'floodOrFire', value: 'floodOrFire' },
                                                ]}
                                                error={errors.notRollingReason}
                                            />
                                            <SimpleInput
                                                label="notRollingDescription"
                                                id="notRollingDescription"
                                                inputType="textarea"
                                                placeholder="notRollingDescription_placeholder"
                                                error={errors.notRollingDescription}
                                            />
                                        </Col>
                                    )}
                                    {vehicleState.running === 'yes' && (
                                        <Col xs={12} md={12} lg={12} xl={8}>
                                            <ButtonRadioInput
                                                label="purchaseProject"
                                                id="purchaseProject"
                                                data={sellDelay}
                                                error={errors.running}
                                            />
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={8} lg={9} xl={6}>
                                <Row>
                                    <Col xs={12}>
                                        <EmailInput error={errors.email} />
                                    </Col>

                                    <Col xs={12} md={6}>
                                        <ZipCodeInput error={errors.zipCode} />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <PhoneInput scope="phone" required={false} />
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
                        <FormGroup
                            check
                            className={`form-group-privacy ${
                                errors.privacy && !privacyChecked ? 'invalid' : ''
                            }`}
                        >
                            <Input
                                type="checkbox"
                                id="privacy"
                                checked={privacyChecked}
                                onClick={() => setPrivacyChecked(!privacyChecked)}
                            />
                            <Label
                                htmlFor="privacy"
                                check
                                dangerouslySetInnerHTML={{
                                    __html: t('policy_of_privacy_html') || '',
                                }}
                            />
                        </FormGroup>
                    </div>
                )}

                <CtaBlock>
                    <Button onClick={handleSubmitForm}>{t('value_your_car_now')}</Button>
                </CtaBlock>
                <p
                    className="footnote"
                    dangerouslySetInnerHTML={{
                        __html: t('form_vehicle_footnote_html') || '',
                    }}
                />
            </Container>
        </div>
    );
};
