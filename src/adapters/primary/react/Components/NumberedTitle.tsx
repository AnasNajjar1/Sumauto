import React from 'react';
import useTranslation from '../hooks/useTranslation';

type TNumberedTitleProps = {
    number: number;
    textKey: string;
};
export const NumberedTitle: React.FC<TNumberedTitleProps> = ({
    number,
    textKey,
}: TNumberedTitleProps) => {
    const { t } = useTranslation();
    return (
        <div className="numbered-title">
            <span className="number">{number}.</span> <span className="title">{t(textKey)}</span>
        </div>
    );
};
