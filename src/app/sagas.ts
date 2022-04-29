import { all, fork } from 'redux-saga/effects';

import { authWatchers } from 'features/authentication';
import { messageWatchers } from 'features/message';
import { dirsWatchers } from 'features/directories';
import { flowsWatchers } from 'features/flows';
import { reportsWatchers } from 'features/reports';
import { brigadierWatchers } from 'features/brigadier';

const watchers = [
    ...messageWatchers,
    ...authWatchers,
    ...dirsWatchers,
    ...flowsWatchers,
    ...reportsWatchers,
    ...brigadierWatchers,
];

export default function* rootSaga() {
    yield all(watchers.map(fork));
}
