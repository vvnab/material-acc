import { all, fork } from 'redux-saga/effects';

import { authWatchers } from 'features/authentication';
import { messageWatchers } from 'features/message';
import { dirsWatchers } from 'features/directories';
import { stockWatchers } from 'features/admin/stock';
import { reportsWatchers } from 'features/admin/reports';
import { brigadierWatchers } from 'features/brigadier';

const watchers = [
    ...messageWatchers,
    ...authWatchers,
    ...dirsWatchers,
    ...stockWatchers,
    ...reportsWatchers,
    ...brigadierWatchers,
];

export default function* rootSaga() {
    yield all(watchers.map(fork));
}
