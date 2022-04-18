import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { showMessage } from "features/message";
import { closeModal } from "features/modal";
import fetch from "common/utils/fetch";

function* getWorker(action: any): any {
  try {
    const data = yield call(fetch, "/api/employees/?enabled=true", "GET");
    yield put(actions.loadSuccess({ ...data }));
  } catch (ex: any) {
    yield put(
      actions.loadFailed({ message: ex.message || "Неизвестная ошибка" })
    );
  }
}

function* getWatcher() {
  yield takeLatest(actions.loadRequest.toString(), getWorker);
}

function* updateWorker(action: any): any {
  const { id, fullName, username, password, role, email, phone } =
    action.payload;

  try {
    let data;
    if (id) {
      data = yield call(fetch, `/api/employees/${id}`, "PUT", {
        username,
        password,
        fullName,
        email,
        phone,
        role,
      });
    } else {
      data = yield call(fetch, `/api/employees/`, "POST", {
        username,
        password,
        fullName,
        email,
        phone,
        role,
      });
    }

    yield put(actions.updateItemSuccess({ ...data }));
    yield put(closeModal());
  } catch (ex: any) {
    yield put(
      actions.updateItemError({
        message: ex.message || "Неизвестная ошибка",
      })
    );
    yield put(
      showMessage({
        type: "error",
        text: ex.message || "Неизвестная ошибка",
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
    yield call(fetch, `/api/employees/${id}`, 'DELETE');
    yield put(actions.deleteItemSuccess(id));
    yield put(closeModal());
  } catch (ex: any) {
    yield put(
      actions.updateItemError({
        message: ex.message || "Неизвестная ошибка",
      })
    );
  }
}

function* deleteWatcher() {
  yield takeLatest(actions.deleteItemRequest.toString(), deleteWorker);
}

const watchers = [getWatcher, updateWatcher, deleteWatcher];

export default watchers;
