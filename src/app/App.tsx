import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'features/router';

import { store, persistor } from './store';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                Deployed!
                <Router />
            </PersistGate>
        </Provider>
    );
}

export default App;
