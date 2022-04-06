import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'common/router';

import { store, persistor } from './store';

import 'assets/styles/index.scss';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
