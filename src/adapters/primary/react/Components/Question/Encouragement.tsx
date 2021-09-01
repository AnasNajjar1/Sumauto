import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

type TEncouragementProps = {
    id: string;
    title: string;
    body: string;
};
export const Encouragement: React.FC<TEncouragementProps> = ({
    id,
    title,
    body,
}: TEncouragementProps) => (
    <div className="encouragement d-none" id={`encouragement_${id}`}>
        <div className="encouragement-title">
            <div className="encouragement-title-icon">
                <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            <div className="encouragement-title-text">{title}</div>
        </div>

        <p>{body}</p>
    </div>
);
