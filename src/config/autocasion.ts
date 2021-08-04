import { TClientConfig } from '../hexagon/interfaces';

const config: TClientConfig = {
    identifier: 'autocasion1234',
    displayRegistrationOption: true,
    registrationRegex:
        '^[a-zA-Z]{2}-?[0-9]{3}-?[a-zA-Z]{2}$||^[0-9]{1,4}-?[a-zA-Z]{1,3}-?[0-9]{2,3}$||^[0-9]{1,4}-?[a-zA-Z]{1,3}-?2[a-bA-B]$',
    zipCodeRegex: '^[0-9]{5}$|^(AD)[0-9]{3}$',
    phoneRegex: '^[6,7,8,9][0-9]{8}$|^(376)[0-9]{9}$',
    mileageMin: 100,
    mileageMax: 499999,
    questionsGroup: [
        ['make', 'model', 'version'],
        ['mileage', 'email', 'zipCode', 'privacy'],
    ],
    required: ['make', 'model', 'version', 'mileage', 'email', 'zipCode', 'privacy'],

    cascadeOrder: ['make', 'model', 'version'],
};
export default config;
