import { all, fork } from 'redux-saga/effects';

import { authWatchers } from 'features/authentication';
import { dirsWatchers } from 'features/directories';
import { messageWatchers } from 'features/message';

const watchers = [...authWatchers, ...dirsWatchers, ...messageWatchers];

export default function* rootSaga() {
    yield all(watchers.map(fork));
}
