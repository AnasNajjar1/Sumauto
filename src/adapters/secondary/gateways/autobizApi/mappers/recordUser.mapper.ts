import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TCustomer, TVehicle } from '../../../../../hexagon/interfaces';
import { AutobizRecordUserDto } from '../dtos/recordUserDto';

export class RecordUserMapper implements Mapper<TVehicle> {
    static toAutobiz(
        identifier: string,
        recordUid: string,
        recordUser: TCustomer,
    ): AutobizRecordUserDto {
        return {
            identifier,
            recordUid,
            mail: recordUser.email,
            phone: recordUser.phone,
            lastName: recordUser.name,
            zipCode: recordUser.zipCode,
        };
    }
}
