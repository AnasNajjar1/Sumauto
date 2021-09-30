export interface AutobizAppointmentDto {
    id: string;
    createdAt: string;
    updateAt: string;
    status: string;
    lastOne: 'yes' | 'no';
    active: 'yes' | 'no';
    appointmentDate: string;
    startHour: string;
    endHour: string;
    expertId: string;
    expertName: string;
    networkId: string;
    dealerId: string;
    dealerName: string;
}
