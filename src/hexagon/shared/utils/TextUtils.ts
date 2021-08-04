import { formVehicleOptions } from '../../../config/config';

export class TextUtils {
    public static encodeQueryData(data: any, format: '&' | '/') {
        const ret = [];

        const separator = format === '&' ? '=' : '/';
        for (const d in data) {
            if (data[d]) {
                ret.push(encodeURIComponent(d) + separator + encodeURIComponent(data[d]));
            }
        }
        const prefix = format === '&' ? '?' : '';
        return prefix + ret.join(format);
    }
}

export const isEmailValid = (email: string): boolean =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

export const isZipCodeValid = (zipCode: string): boolean =>
    zipCode.search(new RegExp(formVehicleOptions.zipCodeRegex)) === 0;

export const isPhoneValid = (phone: string): boolean =>
    phone.search(new RegExp(formVehicleOptions.phoneRegex)) === 0;

export const isMileageValid = (mileage: number): boolean => {
    if (mileage > formVehicleOptions.mileageMax) {
        return false;
    }

    if (mileage < formVehicleOptions.mileageMin) {
        return false;
    }
    return true;
};
