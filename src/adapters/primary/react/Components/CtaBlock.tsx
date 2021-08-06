import React from 'react';

type TCtaBlockProps = {
    children: React.ReactNode;
};

export const CtaBlock: React.FC<TCtaBlockProps> = ({ children }: TCtaBlockProps) => (
    <div className="cta-block">{children}</div>
);
