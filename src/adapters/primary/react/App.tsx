import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, useParams, useHistory } from 'react-router-dom';

import { Appointment } from './Components/Appointment';
import { FormVehicle } from './Components/FormVehicle';
import ErrorModal from './Components/ErrorModal';
import { RouteParams } from '../../../hexagon/interfaces';
import { themeSelector } from './Components/Themes';
import { ErrorPage } from './Components/ErrorPage';

const App: FunctionComponent = () => {
    const history = useHistory();
    const { clientSlug } = useParams<RouteParams>();

    // if (!clientSlug) {
    //     history.push('/error/404');
    // }

    console.log(clientSlug);

    return (
        <React.Suspense fallback={<></>}>
            {themeSelector(clientSlug)}
            <BrowserRouter basename={`/${clientSlug}`}>
                <div className={`app-${clientSlug}`}>
                    <main>
                        <Switch>
                            <Route path="/appointment" component={Appointment} />
                            <Route path="/" component={FormVehicle} />
                        </Switch>
                    </main>
                    <ErrorModal />
                </div>
            </BrowserRouter>
        </React.Suspense>
    );
};

const ClientHandler: FunctionComponent = () => (
    <BrowserRouter>
        <Route path={['/:clientSlug', '/']} component={App} />
    </BrowserRouter>
);

export default ClientHandler;
