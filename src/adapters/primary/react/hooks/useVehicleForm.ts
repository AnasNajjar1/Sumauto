import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { t } from 'autobiz-translate';
import { QuestionKey } from '../../../../hexagon/interfaces';
import {
    getFormListSelector,
    getFormVehicleValue,
} from '../../view-models-generators/referentialSelectors';
import { ButtonRadioInput } from '../Components/Question/ButtonRadioInput';
import { MakeLogoInput } from '../Components/Question/MakeLogoInput';
import { Privacy } from '../Components/Question/Privacy';
import { ReferentialInput } from '../Components/Question/ReferentialInput';
import { RegistrationInput } from '../Components/Question/RegistrationInput';
import { TextInput } from '../Components/Question/TextInput';

import { getMakeList } from '../../../../hexagon/usecases/getMakeList/getMakeList';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { TextUtils } from '../../../../hexagon/shared/utils/TextUtils';

type TError = {
    validation: boolean;
    message: string;
};

type TValidation = {
    [key in QuestionKey]?: TError;
};

type InputComponents = {
    [key in QuestionKey]: {
        component: any;
        props: {
            id: string;
            value?: string;
            text?: any;
            list?: any;
            grid?: any;
            data?: any;
            type?: any;
            error?: TError;
            required: boolean;
        };
    };
};

const useVehicleForm = () => {
    const [validation, setValidation] = useState<TValidation>({});
    const { vehicle } = useSelector(getFormVehicleValue);
    const dispatch = useDispatch();

    const lists = useSelector(getFormListSelector);
    const { client } = useSelector(getClientSelector);

    const setError = (field: string, message?: string) => {
        setValidation((prevState: TValidation) => ({
            ...prevState,
            [field]: { validation: true, message },
        }));
    };

    const removeError = (field: string) => {
        setValidation((prevState: TValidation) => ({
            ...prevState,
            [field]: { validation: false },
        }));
    };

    const isMandatoryQuestion = (question: QuestionKey): boolean =>
        client.config.required?.includes(question);

    const isZipCodeValid = (zipCode: string): boolean =>
        zipCode.search(new RegExp(client.config.zipCodeRegex)) === 0;

    const isPhoneValid = (phone: string): boolean =>
        phone.search(new RegExp(client.config.phoneRegex)) === 0;

    const isMileageValid = (mileage: number): boolean => {
        if (mileage > client.config.mileageMax) {
            return false;
        }

        if (mileage < client.config.mileageMin) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        dispatch(getMakeList());
    }, [dispatch]);

    useEffect(() => {
        const {
            mileage,
            imported,
            history,
            running,
            sellProject,
            email,
            emailConfirmation,
            zipCode,
            phone,
            privacy,
        } = vehicle;

        // Referential
        [
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
        ].forEach((e: any) => {
            if (isMandatoryQuestion(e) && vehicle[e] === '') setError(e, t('mandatory field'));
            else removeError(e);
        });
        // Mileage
        if (mileage && !isMileageValid(mileage)) setError('mileage', t('wrong_mileage'));
        else if (isMandatoryQuestion('mileage') && mileage === '')
            setError('mileage', t('mandatory field'));
        else removeError('mileage');

        // Imported
        if (imported) removeError('imported');

        // History
        if (history) removeError('history');

        // running
        if (running) removeError('running');

        // sellProject
        if (sellProject) removeError('sellProject');

        // Email
        if (email && !TextUtils.isEmailValid(email)) setError('email', t('wrong_email'));
        else if (isMandatoryQuestion('email') && email === '')
            setError('email', t('mandatory field'));
        else removeError('email');

        if (emailConfirmation && emailConfirmation !== email)
            setError('emailConfirmation', t('emails_mistmatch'));
        else if (isMandatoryQuestion('emailConfirmation') && emailConfirmation === '')
            setError('emailConfirmation', t('mandatory field'));
        else removeError('emailConfirmation');

        // ZipCode
        if (zipCode && !isZipCodeValid(zipCode)) setError('zipCode', t('wrong_zipcode'));
        else if (isMandatoryQuestion('zipCode') && zipCode === '')
            setError('zipCode', t('mandatory field'));
        else removeError('zipCode');

        // Phone
        if (phone && !isPhoneValid(phone)) setError('phone', t('wrong_phone'));
        else if (isMandatoryQuestion('phone') && phone === '')
            setError('phone', t('mandatory field'));
        else removeError('phone');

        // privacy
        if (privacy) removeError('privacy');
    }, [dispatch, vehicle]);

    const shouldDisplayQuestionsGroup = (group: number) => {
        const groupsDisplay: any = [];
        groupsDisplay[0] = true;
        client.config.questionsGroup.forEach((element, key) => {
            const empty: any = {};
            element.questions.forEach((e) => {
                empty[e] = '';
            });
            const picked = _.pick(vehicle, element.questions);
            const result = { ...empty, ...picked };
            Object.keys(result).forEach((e: any) => {
                if (!isMandatoryQuestion(e)) delete result[e];
                if (e === '') delete result[e];
            });
            groupsDisplay[key + 1] = Object.values(result).every(Boolean);
        });

        return groupsDisplay[group];
    };

    const canQuote = () =>
        client.config.required.every(
            (e) => vehicle[e] && vehicle[e] !== '' && validation[e]?.validation === false,
        );

    const vehicleProgress = () => {
        let filledQuestion = 0;
        client.config.required.forEach((e) => {
            if (vehicle[e] && vehicle[e] !== '' && validation[e]?.validation === false) {
                filledQuestion += 1;
            }
        });

        return ((filledQuestion / client.config.required.length) * 100) / 2;
    };

    const inputComponents: InputComponents = {
        registration: {
            component: RegistrationInput,
            props: {
                id: 'registration',
                value: vehicle.registration,
                text: { label: t('registration') },
                required: isMandatoryQuestion('registration'),
            },
        },
        makeLogo: {
            component: MakeLogoInput,
            props: {
                id: 'makelogo',
                value: vehicle.make,
                text: { label: t('make') },
                list: lists.make.preferred,
                error: validation.make,
                required: isMandatoryQuestion('make'),
            },
        },
        make: {
            component: ReferentialInput,
            props: {
                id: 'make',
                value: vehicle.make,
                text: { label: t('makes') },
                list: lists.make,
                error: validation.make,
                required: isMandatoryQuestion('make'),
            },
        },
        model: {
            component: ReferentialInput,
            props: {
                id: 'model',
                value: vehicle.model,
                text: { label: t('model') },
                list: lists.model,
                error: validation.model,
                required: isMandatoryQuestion('model'),
            },
        },
        month: {
            component: ReferentialInput,
            props: {
                id: 'month',
                value: vehicle.month,
                text: { label: t('month') },
                list: lists.month,
                error: validation.month,
                required: isMandatoryQuestion('month'),
            },
        },
        year: {
            component: ReferentialInput,
            props: {
                id: 'year',
                value: vehicle.year,
                text: { label: t('year') },
                list: lists.year,
                error: validation.year,
                required: isMandatoryQuestion('year'),
            },
        },
        fuel: {
            component: ReferentialInput,
            props: {
                id: 'fuel',
                value: vehicle.fuel,
                text: { label: t('fuel') },
                list: lists.fuel,
                error: validation.fuel,
                required: isMandatoryQuestion('fuel'),
            },
        },
        body: {
            component: ReferentialInput,
            props: {
                id: 'body',
                value: vehicle.body,
                text: { label: t('body') },
                list: lists.body,
                error: validation.body,
                required: isMandatoryQuestion('body'),
            },
        },
        door: {
            component: ReferentialInput,
            props: {
                id: 'door',
                value: vehicle.door,
                text: { label: t('door') },
                list: lists.door,
                error: validation.door,
                required: isMandatoryQuestion('door'),
            },
        },
        gear: {
            component: ReferentialInput,
            props: {
                id: 'gear',
                value: vehicle.gear,
                text: { label: t('gear') },
                list: lists.gear,
                error: validation.gear,
                required: isMandatoryQuestion('gear'),
            },
        },
        engine: {
            component: ReferentialInput,
            props: {
                id: 'engine',
                value: vehicle.engine,
                text: { label: t('engine') },
                list: lists.engine,
                error: validation.engine,
                required: isMandatoryQuestion('engine'),
            },
        },
        version: {
            component: ReferentialInput,
            props: {
                id: 'version',
                value: vehicle.version,
                text: { label: t('version'), help: t('version_help') },
                list: lists.version,
                error: validation.version,
                required: isMandatoryQuestion('version'),
            },
        },
        mileage: {
            component: TextInput,
            props: {
                id: 'mileage',
                type: 'number',
                value: vehicle.mileage,
                text: { label: t('mileage') },
                error: validation.mileage,
                required: isMandatoryQuestion('mileage'),
            },
        },
        imported: {
            component: ButtonRadioInput,
            props: {
                id: 'imported',
                value: vehicle.imported,
                text: { label: t('imported') },
                data: [
                    { name: t('yes'), value: '1' },
                    { name: t('no'), value: '2' },
                ],
                error: validation.imported,
                required: isMandatoryQuestion('imported'),
            },
        },
        running: {
            component: ButtonRadioInput,
            props: {
                id: 'running',
                value: vehicle.running,
                text: { label: t('running') },
                data: [
                    { name: t('yes'), value: '1' },
                    { name: t('no'), value: '2' },
                ],
                error: validation.running,
                required: isMandatoryQuestion('running'),
            },
        },
        history: {
            component: ButtonRadioInput,
            props: {
                id: 'history',
                value: vehicle.history,
                text: { label: t('history') },
                data: [
                    { name: t('yes'), value: '1' },
                    { name: t('no'), value: '2' },
                ],
                error: validation.history,
                required: isMandatoryQuestion('history'),
            },
        },
        sellProject: {
            component: ButtonRadioInput,
            props: {
                id: 'sellProject',
                value: vehicle.sellProject,
                text: { label: t('sellProject') },
                data: [
                    { name: t('1-3_weeks'), value: '1' },
                    { name: t('1_month'), value: '2' },
                    { name: t('3_months'), value: '3' },
                ],
                error: validation.sellProject,
                required: isMandatoryQuestion('sellProject'),
            },
        },

        email: {
            component: TextInput,
            props: {
                id: 'email',
                type: 'email',
                value: vehicle.email,
                text: { label: t('email') },
                error: validation.email,
                required: isMandatoryQuestion('email'),
            },
        },
        emailConfirmation: {
            component: TextInput,
            props: {
                id: 'emailConfirmation',
                type: 'email',
                value: vehicle.emailConfirmation,
                text: { label: t('emailConfirmation') },
                error: validation.emailConfirmation,
                required: isMandatoryQuestion('emailConfirmation'),
            },
        },
        zipCode: {
            component: TextInput,
            props: {
                id: 'zipCode',
                type: 'text',
                value: vehicle.zipCode,
                text: { label: t('zipCode') },
                error: validation.zipCode,
                required: isMandatoryQuestion('zipCode'),
            },
        },
        phone: {
            component: TextInput,
            props: {
                id: 'phone',
                type: 'text',
                value: vehicle.phone,
                text: { label: t('phone') },
                error: validation.phone,
                required: isMandatoryQuestion('phone'),
            },
        },
        privacy: {
            component: Privacy,
            props: {
                id: 'privacy',
                error: validation.privacy,
                required: isMandatoryQuestion('privacy'),
            },
        },
    };

    return {
        validation,
        inputComponents,
        setError,
        removeError,
        shouldDisplayQuestionsGroup,
        canQuote,
        vehicleProgress,
        isMandatoryQuestion,
    };
};

export default useVehicleForm;
