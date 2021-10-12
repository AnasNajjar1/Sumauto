import { TClientConfig } from '../hexagon/interfaces';

const config: TClientConfig = {
    lang: 'es',
    locale: 'es-ES',
    currency: 'EUR',
    identifier: 'autocasion',
    privateSellLink:
        'https://www.autocasion.com/vender-coche/coche-de-segunda-mano?make=[make]&year=[year]&month=[month]',
    displayRegistrationOption: false,
    registrationRegex: '^[0-9]{4}[a-zA-Z]{3}$|^[a-zA-Z]{1,2}[0-9]{4}-?[a-zA-Z]{2}$',
    zipCodeRegex: '^[0-9]{5}$|^(AD)[0-9]{3}$',
    phoneRegex: '^(6|9)[0-9]{8}$',
    emailConfirmation: true,
    pdfPrivacyLink: 'https://www.soundczech.cz/temp/lorem-ipsum.pdf',
};
export default config;
