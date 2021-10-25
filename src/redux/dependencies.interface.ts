import { HttpTranslationGateway } from '../adapters/secondary/gateways/autobizApi/httpTranslationGateway';
import { ClientConfigGateway } from '../hexagon/gateways/clientConfigGateway.interface';
import { DealerGateway } from '../hexagon/gateways/dealerGateway.interface';
import { RecordGateway } from '../hexagon/gateways/recordGateway.interface';
import { ReferentialGateway } from '../hexagon/gateways/referentialGateway.interface';
import { TrackerGateway } from '../hexagon/gateways/trackerGateway.interface';
import { TranslationGateway } from '../hexagon/gateways/translationGateway.interface';

export interface Dependencies {
    referentialGateway: ReferentialGateway;
    dealerGateway: DealerGateway;
    recordGateway: RecordGateway;
    clientConfigGateway: ClientConfigGateway;
    trackerGateway: TrackerGateway;
    translationGateway: TranslationGateway;
}
