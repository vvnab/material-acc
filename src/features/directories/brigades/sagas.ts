import { call, put, takeLatest } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import { selectBearer } from 'features/authentication/selectors';
import * as actions from './actions';
import * as employeesActions from 'features/directories/employees/actions';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';

const URL = '/api/brigades';

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
    let { id, title, brigadierId, employees } = action.payload;
    employees = [...employees, brigadierId?.toString()];

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
        id = data.id;

        const exsistEmployees = data.employees.map((i: any) => i.id.toString());

        const employeesForDel = exsistEmployees.filter(
            (i: string) => !employees.includes(i)
        );
        const employeesForAdd = employees.filter(
            (i: string) => !exsistEmployees.includes(i)
        );

        for (const employee of employeesForDel) {
            yield call(fetch, `${URL}/${id}/delEmployee/${employee}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${bearer}`,
                },
            });
        }

        for (const employee of employeesForAdd) {
            yield call(fetch, `${URL}/${id}/addEmployee/${employee}`, {
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
        yield put(employeesActions.loadRequest());
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
        yield put(employeesActions.loadRequest());
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
