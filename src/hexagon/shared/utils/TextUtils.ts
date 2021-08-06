export class TextUtils {
    public static isEmailValid = (email: string): boolean =>
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

    public static formatNumber = (locale: string, value: number): string =>
        new Intl.NumberFormat(locale, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        }).format(value);

    public static formatPrice = (locale: string, currency: string, value: number): string =>
        new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        }).format(value);

    public static formatDateNumeric = (locale: string, value: Date): string =>
        new Intl.DateTimeFormat(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(value);
}
