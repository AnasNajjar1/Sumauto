export interface AutobizRecordVehicleStateDto {
    identifier: string;
    recordId: number;
    imported?: boolean;
    service_history?: boolean;
    interior?: number;
    mechanical?: number;

    defaults?: number;
    running?: number;
    frontTire?: number;
    rearTire?: number;
}
