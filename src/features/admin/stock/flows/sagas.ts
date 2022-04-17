import { call, put, takeLatest } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import { selectBearer } from 'features/authentication/selectors';
import * as actions from './actions';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';

const URL = '/api/materialFlows';

function* getWorker(action: any): any {
    const bearer = yield select(selectBearer);
    try {
        const result = yield call(fetch, `${URL}/?sort=createdAt,desc&opsStatuses=CREATED&opsStatuses=ACCEPTED`, {
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

function* getWatcher() {
    yield takeLatest(actions.loadRequest.toString(), getWorker);
}

function* updateWorker(action: any): any {
    const bearer = yield select(selectBearer);
    const {id, type} = action.payload;

    try {
        let result;
        result = yield call(fetch, `${URL}/${id}/${type}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${bearer}`,
            },
        });

        if (!result.ok) {
            console.log(result);
            const { message, error, details } = yield call([
                result,
                result.json,
            ]);
            console.log(message, error, details)
            throw new Error(details || message || error);
        }
        const data = yield call([result, result.json]);
        yield put(actions.updateItemSuccess({ ...data }));
    } catch (ex: any) {
        yield put(
            actions.updateItemError({
                message: ex.message || 'Неизвестная ошибка',
            })
        );
        yield put(
            showMessage({
                type: 'error',
                text: ex.message || 'Неизвестная ошибка',
            })
        );
    }
}

function* updateWatcher() {
    yield takeLatest(actions.updateItemRequest.toString(), updateWorker);
}

function* deleteWorker(action: any): any {
    const bearer = yield select(selectBearer);
    const { id } = action.payload;
    try {
        const result = yield call(fetch, `${URL}/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${bearer}`,
            },
        });
        if (!result.ok) {
            const { message, error, details } = yield call([
                result,
                result.json,
            ]);
            throw new Error(details || message || error);
        }
        yield call([result, result.json]);
        yield put(actions.deleteItemSuccess(id));
        yield put(closeModal());
    } catch (ex: any) {
        yield put(
            actions.updateItemError({
                message: ex.message || 'Неизвестная ошибка',
            })
        );
    }
}

function* deleteWatcher() {
    yield takeLatest(actions.deleteItemRequest.toString(), deleteWorker);
}

const watchers = [getWatcher, updateWatcher, deleteWatcher];

export default watchers;
