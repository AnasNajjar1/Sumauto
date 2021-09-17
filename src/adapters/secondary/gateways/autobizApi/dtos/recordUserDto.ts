export interface AutobizRecordUserDto {
    identifier: string;
    recordId: number;
    mail: string;
    phone: string;
    zipCode: string;
    lastName?: string;
    firstNale?: string;
    ip?: string;
    civility?: number;
    unsubscribed?: boolean;
}
