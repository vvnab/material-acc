import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';
import fetch from "common/utils/fetch";

const URL = '/api/vehicles';

function* getWorker(action: any): any {
    try {
        const data = yield call(fetch, `${URL}/`, 'GET');
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
    const { id, title, workTypes } = action.payload;

    try {
        let data;
        if (id) {
            data = yield call(fetch, `${URL}/${id}`, 'PUT', {title});
        } else {
            data = yield call(fetch, `${URL}/`, 'POST', {title});
        }

        const exsistWorkTypes = data.workTypes.map((i: any) => i.id.toString());

        const workTypesForDel = exsistWorkTypes.filter(
            (i: string) => !workTypes.includes(i)
        );
        const workTypesForAdd = workTypes.filter(
            (i: string) => !exsistWorkTypes.includes(i)
        );

        for (const workType of workTypesForDel) {
            yield call(fetch, `${URL}/${id}/delWorkType/${workType}`, 'PUT');
        }

        for (const workType of workTypesForAdd) {
            yield call(fetch, `${URL}/${id}/addWorkType/${workType}`, 'PUT');
        }

        data = yield call(fetch, `${URL}/${id}`, 'GET');
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

const watchers = [getWatcher, updateWatcher, deleteWatcher];

export default watchers;
