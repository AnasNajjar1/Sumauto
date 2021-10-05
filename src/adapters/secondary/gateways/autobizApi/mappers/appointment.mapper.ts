import moment from 'moment';
import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TAppointment } from '../../../../../hexagon/interfaces';
import { AutobizAppointmentDto } from '../dtos/appointmentDto';

export class AppointmentMapper implements Mapper<TAppointment> {
    static toApp(dto: AutobizAppointmentDto): TAppointment {
        let formattedDate = moment(dto.appointmentDate).format('dddd, D [de] MMMM');
        formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1).toLowerCase();

        return {
            id: Number(dto.id),
            createdAt: dto.createdAt,
            updatedAt: dto.updateAt,
            status: Boolean(dto.status),
            lastOne: dto.lastOne,
            active: dto.active,
            appointmentDate: formattedDate,
            startHour: moment(dto.startHour, 'HHmm').format('HH:mm'),
            endHour: moment(dto.endHour, 'HHmm').format('HH:mm'),
            expertId: Number(dto.expertId),
            expertName: dto.expertName,
            networkId: Number(dto.networkId),
            dealerId: Number(dto.dealerId),
            dealerName: dto.dealerName,
            address: dto.address,
            zipCode: Number(dto.zipCode),
            city: dto.city,
            phone: dto.phone,
            latitude: Number(dto.latitude),
            longitude: Number(dto.longitude),
        };
    }
}
