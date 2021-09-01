import { TClientConfig } from '../hexagon/interfaces';

const config: TClientConfig = {
    locale: 'es-ES',
    currency: 'EUR',
    identifier: 'autoscout1234',
    privateSellLink: 'https://www.autoscout24.es/',
    displayRegistrationOption: true,
    registrationRegex:
        '^[a-zA-Z]{2}-?[0-9]{3}-?[a-zA-Z]{2}$||^[0-9]{1,4}-?[a-zA-Z]{1,3}-?[0-9]{2,3}$||^[0-9]{1,4}-?[a-zA-Z]{1,3}-?2[a-bA-B]$',
    zipCodeRegex: '^[0-9]{5}$|^(AD)[0-9]{3}$',
    phoneRegex: '^[6,7,8,9][0-9]{8}$|^(376)[0-9]{9}$',
    mileageMin: 100,
    mileageMax: 999999,

    questionsGroup: [
        {
            title: 'basic_information',
            questions: [
                'registration',
                'makeLogo',
                'make',
                'model',
                'month',
                'year',
                'fuel',
                'body',
            ],
        },
        {
            title: 'more_details',
            questions: ['door', 'gear', 'engine', 'version', 'mileage', 'imported'],
        },
        {
            title: 'additional_informations',
            questions: [
                'history',
                'running',
                'sellProject',
                'email',
                'emailConfirmation',
                'zipCode',
                'phone',
                'privacy',
            ],
        },
    ],
    required: [
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
        'mileage',
        'imported',
        'running',
        'email',
        'emailConfirmation',
        'zipCode',
        'privacy',
    ],

    cascadeOrder: [
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
    ],
};
export default config;
