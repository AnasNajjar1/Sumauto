import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, useParams, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
// import { TranslateProvider } from 'autobiz-translate';
import { iframeResizer } from 'iframe-resizer';
import { FormVehicle } from './Components/FormVehicle';
import ErrorModal from './Components/ErrorModal';
import { RouteParams } from '../../../hexagon/interfaces';
import { themeSelector } from './Components/Themes';
import { ErrorPage } from './Components/ErrorPage';
import { clients, journeys } from '../../../config';
import { setClientNameUseCase } from '../../../hexagon/usecases/setClientName/setClientName.useCase';
import { Record } from './Components/Record';
import { UnsubscribePage } from './Components/UnsubscribePage';
import { Confirmation } from './Components/Confirmation';
import { setJourneyTypeUseCase } from '../../../hexagon/usecases/setJourneyType/setJourneyType.useCase';

const App: FunctionComponent = () => {
    const history = useHistory();
    const { clientSlug, journeyType } = useParams<RouteParams>();
    const iframeInstance = iframeResizer;

    const dispatch = useDispatch();
    if (!clients.includes(clientSlug) || !journeys.includes(journeyType)) {
        history.push('/error/404');
    } else {
        dispatch(setClientNameUseCase(clientSlug));
        dispatch(setJourneyTypeUseCase(journeyType));
    }

    return (
        // <TranslateProvider projectName="sumauto-app" stage="dev" language="es">
            <React.Suspense fallback={<></>}>
                {themeSelector(clientSlug)}
                <BrowserRouter basename={`/${clientSlug}/${journeyType}`}>
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
        // </TranslateProvider>
    );
};

const ClientHandler: FunctionComponent = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/error/:errorCode" component={ErrorPage} />
            <Route path={['/:clientSlug/:journeyType', '/']} component={App} />
        </Switch>
    </BrowserRouter>
);

export default ClientHandler;
