import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { showMessage } from "features/message";
import { closeModal } from "features/modal";
import fetch from "common/utils/fetch";

const URL = "/api/materialFlows";

function* getWorker(action: any): any {
  try {
    const data = yield call(
      fetch,
      `${URL}/?sort=createdAt,desc&opsStatuses=CREATED&opsStatuses=ACCEPTED`,
      "GET"
    );
    yield put(actions.loadSuccess({ ...data }));
  } catch (ex: any) {
    yield put(
      actions.loadFailed({ message: ex.message  })
    );
  }
}

function* getWatcher() {
  yield takeLatest(actions.loadRequest.toString(), getWorker);
}

function* updateWorker(action: any): any {
  const { id, type } = action.payload;

  try {
    const data = yield call(fetch, `${URL}/${id}/${type}`, "PATCH");
    yield put(actions.updateItemSuccess({ ...data }));
  } catch (ex: any) {
    yield put(
      actions.updateItemError({
        message: ex.message ,
      })
    );
    yield put(
      showMessage({
        type: "error",
        text: ex.message ,
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
  } catch (ex: any) {
    yield put(
      actions.updateItemError({
        message: ex.message ,
      })
    );
  }
}

function* deleteWatcher() {
  yield takeLatest(actions.deleteItemRequest.toString(), deleteWorker);
}

const watchers = [getWatcher, updateWatcher, deleteWatcher];

export default watchers;
