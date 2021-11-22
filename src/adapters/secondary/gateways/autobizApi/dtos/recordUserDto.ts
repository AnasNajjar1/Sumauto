export interface AutobizRecordUserDto {
    identifier: string;
    recordUid: string;
    mail: string;
    phone: string;
    phone2: string;
    zipCode: string;
    lastName?: string;
    firstName?: string;
    ip?: string;
    civility?: number;
    unsubscribed?: boolean;
}
