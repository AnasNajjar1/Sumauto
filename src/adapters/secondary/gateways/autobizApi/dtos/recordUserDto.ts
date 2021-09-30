export interface AutobizRecordUserDto {
    identifier: string;
    recordId: number;
    mail: string;
    phone: string;
    zipCode: string;
    lastName?: string;
    firstName?: string;
    ip?: string;
    civility?: number;
    unsubscribed?: boolean;
}
