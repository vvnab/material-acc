import { all, fork } from 'redux-saga/effects';

import { authWatchers } from 'features/authentication';

const watchers = [...authWatchers];

export default function* rootSaga() {
    yield all(watchers.map(fork));
}
