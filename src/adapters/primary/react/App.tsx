import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, useParams, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { TranslateProvider } from 'autobiz-translate';
import { Appointment } from './Components/Appointment';
import { FormVehicle } from './Components/FormVehicle';
import ErrorModal from './Components/ErrorModal';
import { RouteParams } from '../../../hexagon/interfaces';
import { themeSelector } from './Components/Themes';
import { ErrorPage } from './Components/ErrorPage';
import { clients } from '../../../config';
import { setClientNameUseCase } from '../../../hexagon/usecases/setClientName/setClientName';
import { Record } from './Components/Record';
import { UnsubscribePage } from './Components/UnsubscribePage';
import { Confirmation } from './Components/Confirmation';

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
        <TranslateProvider projectName="sumauto-app" stage="dev" language="es">
            <React.Suspense fallback={<></>}>
                {themeSelector(clientSlug)}
                <BrowserRouter basename={`/${clientSlug}`}>
                    <div className={`app-${clientSlug}`}>
                        <main>
                            <Switch>
                                <Route exact path="/" component={FormVehicle} />
                                <Route path="/unsubscribe" component={UnsubscribePage} />

                                <Route
                                    path="/record/confirmation/:recordId"
                                    component={Confirmation}
                                />
                                <Route path="/record/:recordId" component={Record} />
                                <Route path="/error/:errorCode" component={ErrorPage} />
                            </Switch>
                        </main>
                        <ErrorModal />
                    </div>
                </BrowserRouter>
            </React.Suspense>
        </TranslateProvider>
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
