/*eslint-disable */
import { left, right } from 'fp-ts/Either';
import { BaseApi } from '../../../../hexagon/infra/BaseApi';
import { TSubscription } from '../../../../hexagon/interfaces';
import { ApiResponse } from '../../../../hexagon/infra/ApiResponse';
import { TrackerGateway } from '../../../../hexagon/gateways/trackerGateway.interface';
import { TranslationGateway } from '../../../../hexagon/gateways/translationGateway.interface';
import axios from 'axios';

export class HttpTranslationGateway implements TranslationGateway {

    async requestTranslations(stage:string, projectName:string, lang:string ): Promise<ApiResponse<any>> {

        try {
            const response = await axios.get(`https://translations-host-${stage}.s3-eu-west-1.amazonaws.com/${projectName}/${lang}/locale.json`);

            if (response.status) {
                
                return right(response.data);
            }
            else{
                return left("error");
            }
        } catch (error) {
            return left(error as string);
        }


    }
}
