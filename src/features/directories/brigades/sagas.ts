import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import * as actions from './actions';
import * as employeesActions from 'features/directories/employees/actions';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';
import fetch from "common/utils/fetch";

const URL = '/api/brigades';
const URL2 = '/api/brigadeWarehouse';

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

function* actionWorker(action: any): any {
    const { id, type, toId, materials, acceptFlow, remarks } = action.payload;

    try {
        const data = yield call(
            fetch,
            `${URL2}/${id}/${type}/${toId}`,
            'POST',
            {
                opsDt: moment().format('YYYY-MM-DD'),
                materials,
                acceptFlow,
                remarks,
            }
        );

        yield put(actions.actionItemSuccess({ ...data }));
        yield put(closeModal());
    } catch ({ message }) {
        yield put(actions.actionItemError({ message }));
        yield put(
            showMessage({
                type: 'error',
                text: message,
            })
        );
    }
}

function* actionWatcher() {
    yield takeLatest(actions.actionItemRequest.toString(), actionWorker);
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

const watchers = [getWatcher, updateWatcher, actionWatcher, deleteWatcher];

export default watchers;
