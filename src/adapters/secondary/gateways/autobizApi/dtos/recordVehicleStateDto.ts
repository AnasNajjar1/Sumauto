export interface AutobizRecordVehicleStateDto {
    identifier: string;
    recordUid: string;
    imported?: boolean;
    service_history?: boolean;
    interior?: number;
    mechanical?: number;

    defaults?: number;
    running?: number;
    frontTire?: number;
    rearTire?: number;
    notRollingReason?: number;
    notRollingDescription?: string;
}
