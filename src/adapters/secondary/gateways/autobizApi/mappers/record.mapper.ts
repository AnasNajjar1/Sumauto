import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TOfferStatus, TRecord } from '../../../../../hexagon/interfaces';
import { AutobizRecordDetailsDto } from '../dtos/recordDetailsDto';
import { AppointmentMapper } from './appointment.mapper';

export class RecordMapper implements Mapper<TRecord> {
    static toApp(dto: AutobizRecordDetailsDto): TRecord {
        const { record, vehicle, vehicleState, customer, valuation, appointment } = dto;

        let status: TOfferStatus;

        if (dto.valuation.status === 'Y') {
            if (dto.record.expired) {
                status = 'EXPIRED';
            } else if (dto.record.statusId === '5') {
                status = 'CONFIRMED';
            } else {
                status = 'NO_APPOINTMENT';
            }
        } else {
            status = 'UNQUOTABLE';
        }

        const year = new Date(vehicle.registrationDate).getFullYear().toString();
        let month = (new Date(vehicle.registrationDate).getMonth() + 1).toString();
        month = `0${month}`.slice(-2);
        const data: TRecord = {
            id: record.RfId,
            uid: record.uid,
            offerStatus: status,
            offerNumber: record.HexaRfId,
            vehicle: {
                makeId: vehicle.brandId,
                makeName: vehicle.brandLabel,
                modelName: vehicle.modelLabel,
                year,
                month,
                registrationDate: new Date(vehicle.registrationDate),
                fuelName: vehicle.fuelLabel,
                bodyName: vehicle.bodyLabel,
                engineName: vehicle.gearboxLabel,
                gearName: vehicle.gearboxLabel,
                mileage: Number(vehicle.mileage),
                import: vehicleState.imported === '1',
                versionName: vehicle.versionLabel,
                doors: vehicle.doorsNumber,
            },

            valuation: {
                privateValue: Number(valuation.particular),
                value: Number(valuation.boostedPrice),
                date: new Date(valuation.createdAt),
            },
            customer: {
                email: customer.email,
                zipCode: customer.zipCode,
                phone: customer.phone,
                phone2: customer.phone2,
                name: customer.lastName,
            },
        };
        if (appointment && Object.keys(appointment).length > 0)
            data.appointment = AppointmentMapper.toApp(appointment);
        return data;
    }
}
