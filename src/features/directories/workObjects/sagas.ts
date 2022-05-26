import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';
import fetch from 'common/utils/fetch';

const URL = '/api/workObjects';

function* getWorker(action: any): any {
    const search = new URLSearchParams({
        size: '99',
        showEnabledOnly: action?.payload?.showEnabledOnly || false,
    });
    try {
        const data = yield call(fetch, `${URL}/?${search}`, 'GET');
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

function* getItemWorker(action: any): any {
    const { id } = action.payload;
    try {
        const data = yield call(fetch, `${URL}/${id}`, 'GET');
        yield put(actions.loadItemSuccess({ ...data }));
    } catch (ex: any) {
        yield put(
            actions.loadItemFailed({
                message: ex.message || 'Неизвестная ошибка',
            })
        );
    }
}

function* getItemWatcher() {
    yield takeLatest(actions.loadItemRequest.toString(), getItemWorker);
}

function* updateWorker(action: any): any {
    const { id } = action.payload;

    try {
        let data;
        if (id) {
            data = yield call(fetch, `${URL}/${id}`, 'PUT', action.payload);
        } else {
            data = yield call(fetch, `${URL}/`, 'POST', action.payload);
        }
        yield put(actions.updateItemSuccess({ ...data }));
        yield put(closeModal());
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
    const { id } = action.payload;
    try {
        yield call(fetch, `${URL}/${id}`, 'DELETE');
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

const watchers = [getWatcher, getItemWatcher, updateWatcher, deleteWatcher];

export default watchers;
