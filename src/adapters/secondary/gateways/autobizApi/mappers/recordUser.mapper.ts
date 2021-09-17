import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TCustomer, TVehicle } from '../../../../../hexagon/interfaces';
import { AutobizRecordUserDto } from '../dtos/recordUserDto';

export class RecordUserMapper implements Mapper<TVehicle> {
    static toAutobiz(
        identifier: string,
        recordId: number,
        recordUser: TCustomer,
    ): AutobizRecordUserDto {
        return {
            identifier,
            recordId,
            mail: recordUser.email,
            phone: recordUser.phone,
            zipCode: recordUser.zipCode,
        };
    }
}
