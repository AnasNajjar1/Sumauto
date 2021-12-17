import { TClientConfig } from '../hexagon/interfaces';

const config: TClientConfig = {
    lang: 'es',
    locale: 'es-ES',
    currency: 'EUR',
    identifier: 'autoscout24',
    name: 'AutoScout24',
    privateSellLink:
        'https://www.autoscout24.es/vender-coche/?make=[make]&year=[year]&month=[month]&utm_source=autobiz&utm_medium=iframe&utm_campaign=tasacion',
    displayRegistrationOption: false,
    registrationRegex: '^[0-9]{4}[a-zA-Z]{3}$|^[a-zA-Z]{1,2}[0-9]{4}-?[a-zA-Z]{2}$',
    zipCodeRegex: '^[0-9]{5}$|^(AD)[0-9]{3}$',
    phoneRegex: '^(6|7|9)[0-9]{8}$',
    emailConfirmation: true,
    nameRegex: '^[a-zA-Z ]*$',
};
export default config;
