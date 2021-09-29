import { TClientConfig } from '../hexagon/interfaces';

const config: TClientConfig = {
    locale: 'es-ES',
    currency: 'EUR',
    identifier: 'autocasion',
    privateSellLink: 'https://www.autocasion.com/vender-coche/coche-de-segunda-mano',
    displayRegistrationOption: false,
    registrationRegex: '^[0-9]{4}[a-zA-Z]{3}$|^[a-zA-Z]{1,2}[0-9]{4}-?[a-zA-Z]{2}$',
    zipCodeRegex: '^[0-9]{5}$|^(AD)[0-9]{3}$',
    phoneRegex: '^[6,7,8,9][0-9]{8}$|^(376)[0-9]{9}$',
    emailConfirmation: true,
    pdfPrivacyLink: 'https://www.soundczech.cz/temp/lorem-ipsum.pdf',
};
export default config;
