import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TCustomer, TRecord, TVehicle } from '../../../../../hexagon/interfaces';
import { AutobizRecordDetailsDto } from '../dtos/recordDetailsDto';

export class RecordMapper implements Mapper<TRecord> {
    static toApp(dto: AutobizRecordDetailsDto): TRecord {
        const { record, vehicle, vehicleState, customer, valuation, appointment } = dto;
        return {
            id: record.RfId,
            uid: record.uid,
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
            appointment: appointment
                ? {
                      id: Number(appointment[0].id),
                      createdAt: appointment[0].createdAt,
                      updatedAt: appointment[0].updateAt,
                      status: Boolean(appointment[0].status),
                      lastOne: appointment[0].lastOne,
                      active: appointment[0].active,
                      appointmentDate: appointment[0].appointmentDate,
                      startHour: appointment[0].startHour,
                      endHour: appointment[0].endHour,
                      expertId: Number(appointment[0].expertId),
                      expertName: appointment[0].expertName,
                      networkId: Number(appointment[0].networkId),
                      dealerId: Number(appointment[0].dealerId),
                      dealerName: appointment[0].dealerName,
                  }
                : undefined,
        };
    }
}
