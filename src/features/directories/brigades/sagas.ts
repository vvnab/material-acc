import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as employeesActions from 'features/directories/employees/actions';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';
import fetch from "common/utils/fetch";

const URL = '/api/brigades';

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
    let { id, title, brigadierId, employees } = action.payload;
    employees = [...employees, brigadierId?.toString()];

    try {
        let data;
        if (id) {
            data = yield call(fetch, `${URL}/${id}`, 'PUT', {title});
        } else {
            data = yield call(fetch, `${URL}/`, 'POST', {title});
        }
        id = data.id;
        const exsistEmployees = data.employees.map((i: any) => i.id.toString());
        const employeesForDel = exsistEmployees.filter(
            (i: string) => !employees.includes(i)
        );
        const employeesForAdd = employees.filter(
            (i: string) => !exsistEmployees.includes(i)
        );

        for (const employee of employeesForDel) {
            yield call(fetch, `${URL}/${id}/delEmployee/${employee}`, 'PUT');
        }

        for (const employee of employeesForAdd) {
            yield call(fetch, `${URL}/${id}/addEmployee/${employee}`, 'PUT');
        }
        
        data = yield call(fetch, `${URL}/${id}`, 'GET');

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
    const { id } = action.payload;
    try {
        yield call(fetch, `${URL}/${id}`, 'DELETE');
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
