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

    public static toTitleCase = (phrase: string) => {
        phrase = phrase.toLowerCase();
        const capitalizeLetterFunc = (match: string) => match.toUpperCase();
        return phrase.replace(/(^\w{1})|(\s{1}\w{1})|([-\s]\w)/g, capitalizeLetterFunc);
    };

    public static translateMakeId = (autobizId: string): string => {
        const sumautoId: any = {
            '355': '40',
            '54': '1',
            '212': '53',
            '55': '2',
            '218': '60',
            '57': '4',
            '166': '5',
            '60': '55',
            '58': '6',
            '59': '7',
            '764': '542',
            '231': '69',
            '241': '10',
            '619': '48',
            '62': '11',
            '63': '12',
            '64': '13',
            '338': '65',
            '66': '14',
            '174': '80',
            '67': '57',
            '263': '42',
            '172': '78',
            '69': '16',
            '95': '74',
            '162': '54',
            '269': '62',
            '71': '18',
            '72': '75',
            '164': '19',
            '74': '20',
            '75': '21',
            '76': '22',
            '77': '58',
            '167': '41',
            '79': '23',
            '80': '24',
            '81': '25',
            '82': '26',
            '83': '27',
            '84': '28',
            '342': '87',
            '170': '29',
            '85': '30',
            '86': '31',
            '88': '32',
            '163': '64',
            '175': '59',
            '89': '33',
            '90': '51',
            '336': '66',
            '368': '531',
            '91': '35',
            '92': '36',
            '94': '37',
        };
        return sumautoId[autobizId] ? sumautoId[autobizId] : '0';
    };
}
