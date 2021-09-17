import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

type TMessageProps = {
    display: boolean;
    title?: string;
    body?: string;
    className: 'info' | 'warning' | 'info sm-absolute';
};
export const Message: React.FC<TMessageProps> = ({
    title,
    body,
    className,
    display,
}: TMessageProps) => (
    <div className={`message ${className} ${display ? 'visible' : ''}`}>
        <div className="message-title">
            <div className="message-title-icon">
                <FontAwesomeIcon
                    icon={className === 'warning' ? faExclamationTriangle : faThumbsUp}
                />
            </div>
            <div className="message-title-text">{title}</div>
        </div>

        <p>{body}</p>
    </div>
);
