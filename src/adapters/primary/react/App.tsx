import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import { FormVehicle } from './Components/FormVehicle';
import ErrorModal from './Components/ErrorModal';
import { RouteParams, TDeviceType } from '../../../hexagon/interfaces';
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
import { Cookies } from './Components/Cookies';
import { GeneralConditions } from './Components/GeneralConditions';
import { getTranslationUseCase } from '../../../hexagon/usecases/getTranslation/getRecord.useCase';
import { setClientDeviceTypeUseCase } from '../../../hexagon/usecases/setClientDevice/setClientName.useCase';

const App: React.FC = () => {
    const { clientSlug, journeyType } = useParams<RouteParams>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTranslationUseCase());
    }, [dispatch]);

    if (!clients.includes(clientSlug) || !journeys.includes(journeyType)) {
        return <ErrorPage />;
    }
    dispatch(setClientNameUseCase(clientSlug));
    dispatch(setJourneyTypeUseCase(journeyType));
    const { innerWidth: width } = window;
    let deviceType: TDeviceType = '';
    if (width < 768) deviceType = 'mobile';
    else if (width < 1199) deviceType = 'tablet';
    else if (width > 1200) deviceType = 'desktop';

    dispatch(setClientDeviceTypeUseCase(deviceType));

    return (
        <>
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
        </>
    );
};

const ClientHandler: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route
                exact
                path="/aviso-legal-y-condiciones-generales-de-uso"
                component={GeneralConditions}
            />
            <Route exact path="/politica-de-cookies" component={Cookies} />
            <Route exact path="/politica-de-privacidad" component={PrivacyPolicy} />
            <Route exact path="/error/:errorCode" component={ErrorPage} />
            <Route path={['/:clientSlug/:journeyType', '/']} component={App} />
        </Switch>
    </BrowserRouter>
);

export default ClientHandler;
