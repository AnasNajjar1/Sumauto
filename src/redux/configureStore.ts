import { Action, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { AppState } from './appState';
import { Dependencies } from './dependencies.interface';
import { formReducer } from './reducers/formReducer';
import { dealerReducer } from './reducers/dealerReducer';
import { errorReducer } from './reducers/errorReducer';
import { clientReducer } from './reducers/clientReducer';
import { recordReducer } from './reducers/recordReducer';
import { notRollingReducer } from './reducers/notRollingReducer';
import { unsubscribeReducer } from './reducers/unsubscribeReducer';
import { cancelAppointmentReducer } from './reducers/cancelAppointmentReducer';
import { carDetailsReducer } from './reducers/carDetailsReducer';
import { translationReducer } from './reducers/translationReducer';

export const configureStore = (dependencies?: Partial<Dependencies>) =>
    createStore(
        combineReducers({
            client: clientReducer,
            carDetails: carDetailsReducer,
            form: formReducer,
            dealer: dealerReducer,
            record: recordReducer,
            notRolling: notRollingReducer,
            error: errorReducer,
            unsubscribe: unsubscribeReducer,
            cancelAppointment: cancelAppointmentReducer,
            translation: translationReducer,
        }),
        composeWithDevTools(
            applyMiddleware(
                dependencies
                    ? (thunk.withExtraArgument(dependencies) as ThunkMiddleware<
                          AppState,
                          Action,
                          any
                      >)
                    : thunk,
            ),
        ),
    );

export type ReduxStore = Store<AppState> & {
    dispatch: ThunkDispatch<AppState, any, Action>;
};

export type ThunkResult<R> = ThunkAction<R, AppState, any, Action>;
