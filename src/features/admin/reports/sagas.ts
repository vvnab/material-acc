import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import { selectFilter, selectPages } from './selectors';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';
import fetch from 'common/utils/fetch';

const URL = '/api/workReports';

function createSearch(action: any, filter: any, addon?: any) {
    const search = new URLSearchParams({
        size: '15',
        sort: 'createdAt,desc',
        ...addon,
    });

    if (filter?.statuses && filter.statuses.length) {
        search.append('statuses', filter.statuses);
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

function* getNextPageWorker(action: any): any {
    const filter = yield select(selectFilter);
    let { pageNumber, totalPages } = yield select(selectPages);

    if (pageNumber >= totalPages) {
        yield put(actions.loadFailed({message: 'THE END'}));
        return;
    }
    const search = createSearch(action, filter, { page: ++pageNumber });
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

function* getWorker(action: any): any {
    const filter = yield select(selectFilter);
    const search = createSearch(action, filter);
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

function* updateWorker(action: any): any {
    const { id, type } = action.payload;

    try {
        const data = yield call(fetch, `${URL}/${id}/${type}`, 'PATCH');
        yield put(actions.updateItemSuccess({ ...data }));
    } catch ({ message }) {
        yield put(actions.updateItemError({ message }));
        yield put(
            showMessage({
                type: 'error',
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
        yield call(fetch, `${URL}/${id}`, 'DELETE');
        yield put(actions.deleteItemSuccess(id));
        yield put(closeModal());
    } catch ({ message }) {
        yield put(actions.updateItemError({ message }));
    }
}

function* deleteWatcher() {
    yield takeLatest(actions.deleteItemRequest.toString(), deleteWorker);
}

const watchers = [getWatcher, getNextPageWatcher, updateWatcher, deleteWatcher];

export default watchers;
