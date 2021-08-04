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
