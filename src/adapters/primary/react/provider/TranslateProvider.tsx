import axios from 'axios';
import React, { useState, useEffect } from 'react';

// import { Language } from '../core/domain/Language';
// import { Stage } from '../core/domain/Stage';
// import { TranslateInstance } from '..';

enum availableLanguage {
    fr,
    en,
    es,
    it,
    de,
    pt,
}

type Language = keyof typeof availableLanguage;

enum availableStage {
    prod,
    staging,
    dev,
}

type Stage = keyof typeof availableStage;

export interface ProviderProps {
    children: React.ReactElement;
    projectName: string;
    language?: Language;
    stage?: Stage;
    loader?: React.ReactElement;
}

export const TranslateProvider = ({
    children,
    projectName,
    language = 'fr',
    stage,
    loader,
}: ProviderProps): React.ReactElement => {
    const [isLoaded, setIsLoaded] = useState<null | boolean>(null);

    const initTranslate = async () => {
        try {
            const pathname = `https://translations-host-${stage}.s3-eu-west-1.amazonaws.com/${projectName}/${language}/locale.json`;
            const reponse = await axios.get(pathname);
        } catch (err: any) {
            throw new Error(err.message);
        }

        setIsLoaded(true);
    };

    useEffect(() => {
        setIsLoaded(false);
        initTranslate();
    }, []);

    if (!isLoaded) return <>{loader || <div />}</>;
    return <>{children}</>;
};
