import React from 'react';
import { t } from 'autobiz-translate';

type TNumberedTitleProps = {
    number: number;
    textKey: string;
};
export const NumberedTitle: React.FC<TNumberedTitleProps> = ({
    number,
    textKey,
}: TNumberedTitleProps) => (
    <div className="numbered-title">
        <span className="number">{number}.</span> <span className="title">{t(textKey)}</span>
    </div>
);
