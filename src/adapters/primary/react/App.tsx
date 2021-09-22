import React from 'react';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { TranslateProvider } from 'autobiz-translate';
import { iframeResizer } from 'iframe-resizer';
import { Spinner } from 'reactstrap';
import { FormVehicle } from './Components/FormVehicle';
import ErrorModal from './Components/ErrorModal';
import { RouteParams } from '../../../hexagon/interfaces';
import { themeSelector } from './Themes';
import { ErrorPage } from './Components/ErrorPage';
import { clients, journeys } from '../../../config';
import { setClientNameUseCase } from '../../../hexagon/usecases/setClientName/setClientName.useCase';
import { RecordPage } from './Components/RecordPage';
import { UnsubscribePage } from './Components/UnsubscribePage';
import { Confirmation } from './Components/Confirmation';
import { setJourneyTypeUseCase } from '../../../hexagon/usecases/setJourneyType/setJourneyType.useCase';

const App: React.FC = () => {
    const { clientSlug, journeyType } = useParams<RouteParams>();
    const iframeInstance = iframeResizer;

    const dispatch = useDispatch();
    if (!clients.includes(clientSlug) || !journeys.includes(journeyType)) {
        return <ErrorPage />;
    }
    dispatch(setClientNameUseCase(clientSlug));
    dispatch(setJourneyTypeUseCase(journeyType));

    return (
        <TranslateProvider projectName="sumauto-app" stage="dev" language="es">
            <React.Suspense
                fallback={
                    <div className="loading-page">
                        <Spinner type="grow" color="primary" />
                    </div>
                }
            >
                {themeSelector(clientSlug)}
                <BrowserRouter basename={`/${clientSlug}/${journeyType}`}>
                    <div className={`app-${clientSlug}`}>
                        <main>
                            <Switch>
                                <Route exact path="/" component={FormVehicle} />
                                <Route path="/unsubscribe" component={UnsubscribePage} />

                                {/* <Route
                                    path="/record/confirmation/:recordId"
                                    component={Confirmation}
                                /> */}
                                <Route path="/record/:recordId" component={RecordPage} />
                                <Route component={ErrorPage} />
                            </Switch>
                        </main>
                        <ErrorModal />
                    </div>
                </BrowserRouter>
            </React.Suspense>
        </TranslateProvider>
    );
};

const ClientHandler: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/error/:errorCode" component={ErrorPage} />
            <Route path={['/:clientSlug/:journeyType', '/']} component={App} />
        </Switch>
    </BrowserRouter>
);

export default ClientHandler;
