import { call, put, takeLatest } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import { selectBearer } from 'features/authentication/selectors';
import * as actions from './actions';

function* worker(action: any): any {
    const bearer = yield select(selectBearer);
    try {
        const result = yield call(fetch, '/api/employees/', {
            method: 'get',
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
        const data = yield call([result, result.json]);
        yield put(actions.loadSuccess({ ...data }));
    } catch (ex: any) {
        yield put(
            actions.loadFailed({ message: ex.message || 'Неизвестная ошибка' })
        );
    }
}

function* watcher() {
    yield takeLatest(actions.loadRequest.toString(), worker);
}
const watchers = [watcher];

export default watchers;
