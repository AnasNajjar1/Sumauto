import React from 'react';

type TBackground = 'searching' | 'archive' | 'calendar' | 'icon-calendar' | 'steps';

type TPictureProps = {
    background: TBackground;
    alt?: string;
};
export const Picture: React.FC<TPictureProps> = ({ background, alt }: TPictureProps) => (
    <div className={`picture picture-${background}`} role="img" aria-label={alt} />
);
