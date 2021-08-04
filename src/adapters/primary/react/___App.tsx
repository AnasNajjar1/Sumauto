import React, { FunctionComponent, useEffect } from 'react';
import { Container } from 'reactstrap';
import '../../../assets/scss/app.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
} from 'react-router-dom';
import { Appointment } from './Components/Appointment';
import ErrorModal from './Components/ErrorModal';
import { setClientIdentifierUseCase } from '../../../hexagon/usecases/setClientIdentifier/setClientIdentifier';
import { showError } from '../../../hexagon/usecases/displayError/displayError';
import { getClientSelector } from '../view-models-generators/clientSelector';
import { t } from '../../../hexagon/shared/utils/translate';
import { FormVehicle } from './Components/FormVehicle';
import { RouteParams } from '../../../hexagon/interfaces';

const App: FunctionComponent = () => {
    const { identifier, recordId } = Object.fromEntries(
        new URLSearchParams(window.location.search).entries(),
    );

    const { clientSlug } = useParams<RouteParams>();

    const dispatch = useDispatch();
    useEffect(() => {
        if (identifier) {
            dispatch(setClientIdentifierUseCase(identifier));
            if (recordId) {
                dispatch(setClientIdentifierUseCase(recordId));
            }
        } else {
            dispatch(showError(t('Client Identifier missing')));
        }
    }, [dispatch, identifier, recordId]);

    const { client } = useSelector(getClientSelector);

    return (
        <Router>
            <Switch>
                <Route path="/:slug/appointment">
                    <Appointment />
                </Route>
            </Switch>
        </Router>
    );
};
export default App;
