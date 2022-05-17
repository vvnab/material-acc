import { call, put, takeLatest, select, delay } from 'redux-saga/effects';
import * as actions from './actions';
import { selectFilter, selectPages } from './selectors';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';
import fetch from 'common/utils/fetch';

const URL = '/api/materialFlows';

function createSearch(filter: any, addon?: any) {
    const search = new URLSearchParams({
        size: '15',
        sort: 'opsDt,createdAt,desc',
        ...addon,
    });

    if (filter?.opsStatuses && filter.opsStatuses.length) {
        search.append('opsStatuses', filter.opsStatuses);
    }

    if (filter?.opsTypes && filter.opsTypes.length) {
        search.append('opsTypes', filter.opsTypes);
    }

    if (filter?.dateRange?.from) {
        search.append('from', filter.dateRange.from);
    }

    if (filter?.dateRange?.to) {
        search.append('to', filter.dateRange.to);
    }

    if (filter?.warehouseId) {
        search.append('warehouseId', filter.warehouseId);
    }

    if (filter?.brigadeId) {
        search.append('brigadeId', filter.brigadeId);
    }
    return search;
}

function* getNextPageWorker(): any {
    const filter = yield select(selectFilter);
    let { pageNumber, totalPages } = yield select(selectPages);

    if (pageNumber >= totalPages) {
        yield put(actions.loadFailed({ message: 'THE END' }));
        return;
    }
    const search = createSearch(filter, { page: ++pageNumber });
    try {
        const data = yield call(fetch, `${URL}/?${search}`, 'GET');
        yield put(actions.loadNextPageSuccess({ ...data }));
    } catch ({ message }) {
        yield put(actions.loadFailed({ message }));
    }
}

function* getNextPageWatcher() {
    yield takeLatest(actions.loadNextPageRequest.toString(), getNextPageWorker);
}

function* getWorker(): any {
    const filter = yield select(selectFilter);
    const search = createSearch(filter);
    try {
        const data = yield call(fetch, `${URL}/?${search}`, 'GET');
        yield put(actions.loadSuccess({ ...data }));
    } catch ({ message }) {
        yield put(actions.loadFailed({ message }));
    }
}

function* getWatcher() {
    yield takeLatest(
        [actions.loadRequest.toString(), actions.updateFilter.toString()],
        getWorker
    );
}

function* actionWorker(action: any): any {
    const { id, type } = action.payload;

    try {
        const data = yield call(fetch, `${URL}/${id}/${type}`, 'PATCH');
        yield put(actions.actionItemSuccess({ ...data }));
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
        yield put(closeModal());
    } catch ({ message }) {
        yield put(actions.actionItemError({ message }));
    }
}

function* deleteWatcher() {
    yield takeLatest(actions.deleteItemRequest.toString(), deleteWorker);
}

// function* updatePeriodically() {
//     while (true) {
//         yield delay(10000);
//         yield call(getWorker);
//     }
// }

const watchers = [
    getWatcher,
    getNextPageWatcher,
    actionWatcher,
    deleteWatcher,
    // updatePeriodically,
];

export default watchers;
