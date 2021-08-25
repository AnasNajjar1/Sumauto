import React from 'react';

type TInputWithValidation = {
    children: React.ReactNode;
};

export const InputWithValidation: React.FC<TInputWithValidation> = ({
    children,
}: TInputWithValidation) => <div className="input-with-validation">{children}</div>;
