import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import moment from "moment";
import { showMessage } from "features/message";
import { closeModal } from "features/modal";
import fetch from "common/utils/fetch";

const URL = "/api/warehouses";

function* getWorker(action: any): any {
  try {
    const data = yield call(fetch, `${URL}/`, "GET");
    yield put(actions.loadSuccess({ ...data }));
  } catch ({ message }) {
    yield put(actions.loadFailed({ message }));
  }
}

function* getWatcher() {
  yield takeLatest(actions.loadRequest.toString(), getWorker);
}

function* updateWorker(action: any): any {
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

function* updateWatcher() {
  yield takeLatest(actions.updateItemRequest.toString(), updateWorker);
}

function* deleteWorker(action: any): any {
  const { id } = action.payload;
  try {
    yield call(fetch, `${URL}/${id}`, "DELETE");
    yield put(actions.deleteItemSuccess(id));
    yield put(closeModal());
  } catch ({ message }) {
    yield put(actions.updateItemError({ message }));
  }
}

function* deleteWatcher() {
  yield takeLatest(actions.deleteItemRequest.toString(), deleteWorker);
}

const watchers = [getWatcher, updateWatcher, deleteWatcher];

export default watchers;
