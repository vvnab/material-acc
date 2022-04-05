import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import rootSaga from './sagas';

import rootReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const persistor = persistStore(createStore(persistedReducer));

export const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(rootSaga);
