import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import rootSaga from './sagas';

import rootReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
              applyMiddleware(sagaMiddleware)
          )
        : applyMiddleware(sagaMiddleware)
);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
