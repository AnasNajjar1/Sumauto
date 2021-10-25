import { ApiResponse } from '../infra/ApiResponse';

export interface TranslationGateway {
    requestTranslations(
        stage: string,
        projectName: string,
        lang: string,
    ): Promise<ApiResponse<any>>;
}
