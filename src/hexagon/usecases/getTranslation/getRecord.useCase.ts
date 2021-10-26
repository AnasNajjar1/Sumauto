import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { TranslationGateway } from '../../gateways/translationGateway.interface';
import * as actionCreators from './actionCreators';

export const getTranslationUseCase =
    (): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { translationGateway }: { translationGateway: TranslationGateway },
    ) => {
        dispatch(actionCreators.Actions.translationFetching());
        const result = await translationGateway.requestTranslations('dev', 'sumauto-app', 'es');

        if (isRight(result)) {
            dispatch(actionCreators.Actions.translationRetrieved(result.right));
        } else {
            dispatch(actionCreators.Actions.translationFailed());
        }
    };
