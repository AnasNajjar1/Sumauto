import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';


interface TInputValidation {
    valid?: boolean;
}

export const InputValidation: React.FC<TInputValidation> = ({ valid }: TInputValidation) => (
    <div className="input-validation">
        {valid === true && <FontAwesomeIcon icon={faCheck} />}
        {valid === false && <FontAwesomeIcon icon={faTimes} />}
    </div>
);
