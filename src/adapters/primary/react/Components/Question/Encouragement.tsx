import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { boolean } from 'fp-ts';

type TEncouragementProps = {
    display: boolean;
    title: string;
    body: string;
};
export const Encouragement: React.FC<TEncouragementProps> = ({
    title,
    body,
    display,
}: TEncouragementProps) => (
    <div className={`encouragement ${display ? 'visible' : ''}`}>
        <div className="encouragement-title">
            <div className="encouragement-title-icon">
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            <div className="encouragement-title-text">{title}</div>
        </div>

        <p>{body}</p>
    </div>
);
