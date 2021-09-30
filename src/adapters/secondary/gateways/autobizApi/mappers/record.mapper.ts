import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TCustomer, TRecord, TVehicle } from '../../../../../hexagon/interfaces';
import { AutobizRecordDetailsDto } from '../dtos/recordDetailsDto';

export class RecordMapper implements Mapper<TRecord> {
    static toApp(dto: AutobizRecordDetailsDto): TRecord {
        const { record, vehicle, vehicleState, customer, valuation, appointment } = dto;

        return {
            id: record.RfId,
            expired: false,
            offerNumber: record.HexaRfId,
            vehicle: {
                makeName: vehicle.brandLabel,
                modelName: vehicle.modelLabel,
                yearName: vehicle.registrationDate,
                monthName: vehicle.registrationDate,
                fuelName: vehicle.fuelLabel,
                bodyName: vehicle.bodyLabel,
                engineName: vehicle.gearboxLabel,
                gearName: vehicle.gearboxLabel,
                mileage: Number(vehicle.mileage),
                import: vehicleState.imported === '1',
                versionName: vehicle.versionLabel,
            },

            // TODO Fix this
            valuation: {
                privateValue: Number(valuation.particular),
                value: Number(valuation.boostedPrice),
                status: true,
                archived: false,
                date: new Date(),
            },
            customer: {
                email: customer.email,
                zipCode: customer.zipCode,
                phone: customer.phone,
                name: `${customer.firstName} ${customer.lastName}`,
            },
            appointment: {
                id: Number(appointment.id),
                createdAt: appointment.createdAt,
                updatedAt: appointment.updateAt,
                status: Boolean(appointment.status),
                lastOne: appointment.lastOne,
                active: appointment.active,
                appointmentDate: appointment.appointmentDate,
                startHour: appointment.startHour,
                endHour: appointment.endHour,
                expertId: Number(appointment.expertId),
                expertName: appointment.expertName,
                networkId: Number(appointment.networkId),
                dealerId: Number(appointment.dealerId),
                dealerName: appointment.dealerName,
            },
        };
    }
}
