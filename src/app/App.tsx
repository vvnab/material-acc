import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { Message } from 'features/message';

import { store, persistor } from './store';

import 'assets/styles/index.scss';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
                <Message />
            </PersistGate>
        </Provider>
    );
}

export default App;

console.log('REACT_APP_BOOKING_URL', process.env.REACT_APP_BOOKING_URL);