import React from 'react';

type TBackground =
    | 'searching'
    | 'archive'
    | 'calendar'
    | 'icon-calendar'
    | 'icon-print'
    | 'steps'
    | 'chat'
    | 'meeting';

type TPictureProps = {
    background: TBackground;
    alt?: string;
};
export const Picture: React.FC<TPictureProps> = ({ background, alt }: TPictureProps) => (
    <div className={`picture picture-${background}`} role="img" aria-label={alt} />
);
