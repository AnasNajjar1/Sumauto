import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TCustomer, TRecord, TVehicle } from '../../../../../hexagon/interfaces';
import { AutobizRecordDetailsDto } from '../dtos/recordDetailsDto';

export class RecordMapper implements Mapper<TRecord> {
    static toApp(dto: AutobizRecordDetailsDto): TRecord {
        const { record, vehicle, vehicleState } = dto;
        return {
            id: record.rf_id,
            status: record.status === '1' ? 'created' : '???',
            offerNumber: record.offre,
            vehicle: {
                makeName: vehicle.brand_label,
                modelName: vehicle.model_label,
                yearName: vehicle.registration_date,
                monthName: vehicle.registration_date,
                fuelName: vehicle.fuel_label,
                bodyName: vehicle.body_label,
                engineName: vehicle.gearbox_label,
                gearName: vehicle.gearbox_label,
                mileage: Number(vehicle.mileage),
                import: vehicleState.imported === '1',
                versionName: vehicle.version_label,
            },

            // TODO Fix this
            valuation: {
                value: 10000,
                status: true,
                archived: false,
                date: new Date(),
            },
            customer: {
                email: 'm.azzopardi@autobiz.com',
                phone: '912345678',
                zipCode: '13001',
                lastName: 'Azzopardi',
                firstName: 'Marceau',
            },
        };
    }
}
