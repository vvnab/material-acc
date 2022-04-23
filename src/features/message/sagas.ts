import { put, takeEvery, delay } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';
import * as actions from './actions';

function* worker(action: any): any {
    const message = { ...action.payload, id: uuid() };
    yield put(actions.addMessage(message));
    yield delay(5000);
    yield put(actions.hideMessage(message.id));
}

function* watcher() {
    yield takeEvery(actions.showMessage.toString(), worker);
}

const watchers = [watcher];

export default watchers;
