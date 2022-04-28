import { call, put, takeLatest } from 'redux-saga/effects';
import moment from "moment";
import * as actions from './actions';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';
import fetch from "common/utils/fetch";

const URL = '/api/warehouses';

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
    const { id, title } = action.payload;

    try {
        let data;
        if (id) {
            data = yield call(fetch, `${URL}/${id}`, 'PUT', {title});
        } else {
            data = yield call(fetch, `${URL}/`, 'POST', {title});
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

function* actionWorker(action: any): any {
    const { id, type, toWarehouseId, materials, acceptFlow, remarks } =
      action.payload;
  
    try {
      const data = yield call(
        fetch,
        `${URL}/${id}/${type}${toWarehouseId ? "/" + toWarehouseId : ""}`,
        "POST",
        {
          opsDt: moment().format("YYYY-MM-DD"),
          materials,
          acceptFlow,
          remarks,
        }
      );
  
      yield put(actions.updateItemSuccess({ ...data }));
      if (toWarehouseId) {
        yield put(actions.loadRequest());
      }
      yield put(closeModal());
    } catch ({ message }) {
      yield put(actions.updateItemError({ message }));
      yield put(
        showMessage({
          type: "error",
          text: message,
        })
      );
    }
  }
  
  function* actionWatcher() {
    yield takeLatest(actions.actionItemRequest.toString(), actionWorker);
  }
  
function* deleteWorker(action: any): any {
    if (!window.confirm('Вы уверены?')) {
        yield put(closeModal());
        yield put(
            actions.updateItemError({
                message: 'Отказ от намерений',
            })
        );
        return;
    }
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

const watchers = [getWatcher, updateWatcher, actionWatcher, deleteWatcher];

export default watchers;
