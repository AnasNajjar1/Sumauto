import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TAppointment } from '../../../../../hexagon/interfaces';
import { AutobizAppointmentDto } from '../dtos/appointmentDto';

export class AppointmentMapper implements Mapper<TAppointment> {
    static toApp(dto: AutobizAppointmentDto): TAppointment {
        return {
            id: Number(dto.id),
            createdAt: dto.createdAt,
            updatedAt: dto.updateAt,
            status: Boolean(dto.status),
            lastOne: dto.lastOne,
            active: dto.active,
            appointmentDate: dto.appointmentDate,
            startHour: dto.startHour,
            endHour: dto.endHour,
            expertId: Number(dto.expertId),
            expertName: dto.expertName,
            networkId: Number(dto.networkId),
            dealerId: Number(dto.dealerId),
            dealerName: dto.dealerName,
        };
    }
}
