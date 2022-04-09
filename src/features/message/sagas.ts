import { put, takeLatest, delay } from 'redux-saga/effects';
import * as actions from './actions';

function* worker(action: any): any {
    yield delay(3000);
    yield put(actions.hideMessage());
}

function* watcher() {
    yield takeLatest(actions.showMessage.toString(), worker);
}

const watchers = [watcher];

export default watchers;
