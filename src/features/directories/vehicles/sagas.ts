import { call, put, takeLatest } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import { selectBearer } from 'features/authentication/selectors';
import * as actions from './actions';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';

const URL = '/api/vehicles';

function* getWorker(action: any): any {
    const bearer = yield select(selectBearer);
    try {
        const result = yield call(fetch, `${URL}/`, {
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
    const { id, title, workTypes } = action.payload;

    try {
        let result;
        if (id) {
            result = yield call(fetch, `${URL}/${id}`, {
                method: 'put',
                body: JSON.stringify({
                    title,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${bearer}`,
                },
            });
        } else {
            result = yield call(fetch, `${URL}/`, {
                method: 'post',
                body: JSON.stringify({
                    title,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${bearer}`,
                },
            });
        }

        if (!result.ok) {
            const { message, error, details } = yield call([
                result,
                result.json,
            ]);
            throw new Error(details || message || error);
        }
        let data = yield call([result, result.json]);

        const exsistWorkTypes = data.workTypes.map((i: any) => i.id.toString());

        const workTypesForDel = exsistWorkTypes.filter(
            (i: string) => !workTypes.includes(i)
        );
        const workTypesForAdd = workTypes.filter(
            (i: string) => !exsistWorkTypes.includes(i)
        );

        for (const workType of workTypesForDel) {
            yield call(fetch, `${URL}/${id}/delWorkType/${workType}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${bearer}`,
                },
            });
        }

        for (const workType of workTypesForAdd) {
            yield call(fetch, `${URL}/${id}/addWorkType/${workType}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${bearer}`,
                },
            });
        }

        result = yield call(fetch, `${URL}/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${bearer}`,
            },
        });
        data = yield call([result, result.json]);

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
