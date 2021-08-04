import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, useParams, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { Appointment } from './Components/Appointment';
import { FormVehicle } from './Components/FormVehicle';
import ErrorModal from './Components/ErrorModal';
import { RouteParams } from '../../../hexagon/interfaces';
import { themeSelector } from './Components/Themes';
import { ErrorPage } from './Components/ErrorPage';
import { clients } from '../../../config';
import { setClientNameUseCase } from '../../../hexagon/usecases/setClientName/setClientName';

const App: FunctionComponent = () => {
    const history = useHistory();
    const { clientSlug } = useParams<RouteParams>();

    const dispatch = useDispatch();
    if (!clients.includes(clientSlug)) {
        history.push('/error/404');
    } else {
        dispatch(setClientNameUseCase(clientSlug));
    }

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
        <Switch>
            <Route exact path="/error/:errorCode" component={ErrorPage} />
            <Route path={['/:clientSlug', '/']} component={App} />
        </Switch>
    </BrowserRouter>
);

export default ClientHandler;
