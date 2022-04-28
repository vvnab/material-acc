import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';

function* loginWorker(action: any): any {
    try {
        let result = yield call(fetch, '/api/public/login', {
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        if (!result.ok) {
            const { message, error } = yield call([result, result.json]);
            throw new Error(message || error);
        }
        const bearer = result.headers.get('authorization');
        let data = yield call([result, result.json]);

        result = yield call(fetch, `/api/employees/${data.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${bearer}`,
            },
        });
        if (!result.ok) {
            const { message, error } = yield call([result, result.json]);
            throw new Error(message || error);
        }
        data = yield call([result, result.json]);

        yield put(actions.loginSuccess({ ...data, bearer }));
    } catch (ex: any) {
        yield put(
            actions.loginFailed({ message: ex.message || 'Неизвестная ошибка' })
        );
    }
}

function* loginWatcher() {
    yield takeLatest(actions.loginRequest.toString(), loginWorker);
}

export const watchers = [loginWatcher];
