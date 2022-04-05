import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';

function* loginWorker(action: any): any {
    try {
        const result = yield call(fetch, '/api/public/login', {
            method: 'post',
            body: JSON.stringify(action.payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const bearer = result.headers.get('authorization');
        const data = yield call([result, result.json]);
        yield put(actions.loginSuccess({ ...data, bearer }));
    } catch (ex) {
        yield put(actions.loginFailed(ex));
    }
}

function* loginWatcher() {
    yield takeLatest(actions.loginRequest.toString(), loginWorker);
}

export const watchers = [loginWatcher];
