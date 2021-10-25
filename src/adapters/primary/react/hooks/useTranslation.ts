import { useSelector } from 'react-redux';
import { getTranslationSelector } from '../../view-models-generators/translationSelector';

export default function useTranslation() {
    const { data: translation } = useSelector(getTranslationSelector);

    const t = (key: string) => translation[key];
    return { t };
}
