import React, { FunctionComponent } from 'react';
import { clients } from '../../../../../config';
import { TClient } from '../../../../../hexagon/interfaces';

export const themeSelector = (client: TClient) => {
    let Theme;
    if (clients.includes(client)) Theme = React.lazy(async () => import(`./${client}`));
    else Theme = React.lazy(async () => import(`./default`));
    return <Theme />;
};
