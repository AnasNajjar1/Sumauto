import React from 'react';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TranslateProvider } from 'autobiz-translate';
import { Spinner } from 'reactstrap';
import TagManager from 'react-gtm-module';
import moment from 'moment';
import { FormVehicle } from './Components/FormVehicle';
import ErrorModal from './Components/ErrorModal';
import { RouteParams } from '../../../hexagon/interfaces';
import { themeSelector } from './Themes';
import { ErrorPage } from './Components/ErrorPage';
import { clients, journeys } from '../../../config';
import { setClientNameUseCase } from '../../../hexagon/usecases/setClientName/setClientName.useCase';
import { RecordPage } from './Components/RecordPage';
import { UnsubscribePage } from './Components/UnsubscribePage';
import { setJourneyTypeUseCase } from '../../../hexagon/usecases/setJourneyType/setJourneyType.useCase';
import { ValuationSwitch } from './Components/ValuationSwitchPage';
import { PrivacyPolicy } from './Components/PrivacyPolicy';
import 'moment/locale/es';
import { getClientSelector } from '../view-models-generators/clientSelector';

const App: React.FC = () => {
    const { clientSlug, journeyType } = useParams<RouteParams>();
    const { config } = useSelector(getClientSelector).client;
    const { lang } = config;
    const dispatch = useDispatch();
    if (!clients.includes(clientSlug) || !journeys.includes(journeyType)) {
        return <ErrorPage />;
    }
    dispatch(setClientNameUseCase(clientSlug));
    dispatch(setJourneyTypeUseCase(journeyType));

    moment.locale(lang);

    const tagManagerArgs = {
        gtmId: 'GTM-000000',
        dataLayer: {
            site: clientSlug,
        },
    };
    TagManager.initialize(tagManagerArgs);

    return (
        <TranslateProvider projectName="sumauto-app" stage="dev" language={lang}>
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
                                <Route path="/switch/:recordUid" component={ValuationSwitch} />
                                <Route path="/record/:recordUid" component={RecordPage} />
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
            <Route exact path="/politica-de-privacidad" component={PrivacyPolicy} />
            <Route exact path="/error/:errorCode" component={ErrorPage} />
            <Route path={['/:clientSlug/:journeyType', '/']} component={App} />
        </Switch>
    </BrowserRouter>
);

export default ClientHandler;
