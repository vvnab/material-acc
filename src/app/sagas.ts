import { all, fork } from 'redux-saga/effects';

import { authWatchers } from 'features/authentication';
import { dirsWatchers } from 'features/directories';

const watchers = [...authWatchers, ...dirsWatchers];

export default function* rootSaga() {
    yield all(watchers.map(fork));
}
