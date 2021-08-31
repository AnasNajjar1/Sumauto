import { Action, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { AppState } from './appState';
import { Dependencies } from './dependencies.interface';
import { referentialReducer } from './reducers/referentialReducer';
import { dealerReducer } from './reducers/dealerReducer';
import { formReducer } from './reducers/formReducer';
import { errorReducer } from './reducers/errorReducer';
import { clientReducer } from './reducers/clientReducer';
import { recordReducer } from './reducers/recordReducer';
import { unsubscribeReducer } from './reducers/unsubscribeReducer';
import { cancelAppointmentReducer } from './reducers/cancelAppointmentReducer';

export const configureStore = (dependencies?: Partial<Dependencies>) =>
    createStore(
        combineReducers({
            client: clientReducer,
            referential: referentialReducer,
            dealer: dealerReducer,
            record: recordReducer,
            form: formReducer,
            error: errorReducer,
            unsubscribe: unsubscribeReducer,
            cancelAppointment: cancelAppointmentReducer,
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
