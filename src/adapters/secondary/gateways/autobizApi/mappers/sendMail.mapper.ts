import { Mapper } from '../../../../../hexagon/infra/Mapper';
import { TEmailCategory } from '../../../../../hexagon/interfaces';
import { AutobizSendMailDto } from '../dtos/sendMailDto';

export class SendMailMapper implements Mapper<string> {
    static toAutobiz(identifier: string, emailCategory: TEmailCategory): AutobizSendMailDto {
        return {
            identifier,
            emailCategory,
        };
    }
}
