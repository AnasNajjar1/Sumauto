import { TClientConfig } from '../hexagon/interfaces';

const config: TClientConfig = {
    lang: 'es',
    locale: 'es-ES',
    currency: 'EUR',
    identifier: 'unoauto',
    name: 'Unoauto',
    noDealersAdsLinkValuation:
        'https://www.autoscout24.es/vender-coche?utm_source=autobiz&utm_medium=appointment-page&utm_campaign=venta-directa',
    noDealersAdsLinkSale:
        'https://www.autoscout24.es/vender-coche?utm_source=autobiz&utm_medium=appointment-page&utm_campaign=venta-directa',
    displayRegistrationOption: false,
    registrationRegex: '^[0-9]{4}[a-zA-Z]{3}$|^[a-zA-Z]{1,2}[0-9]{4}-?[a-zA-Z]{2}$',
    zipCodeRegex: '^[0-9]{5}$|^(AD)[0-9]{3}$',
    phoneRegex: '^(6|7|9)[0-9]{8}$',
    emailConfirmation: true,
    nameRegex: '^[a-zA-Z ]*$',
};
export default config;
