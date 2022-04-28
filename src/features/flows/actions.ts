import { createAction } from 'redux-actions';

const PREFIX = 'FLOWS';

export const updateFilter = createAction(`${PREFIX}/UPDATE_FILTER`);

export const loadRequest = createAction(`${PREFIX}/REQUEST`);
export const loadSuccess = createAction(`${PREFIX}/SUCCESS`);
export const loadNextPageRequest = createAction(`${PREFIX}/REQUEST_NEXT_PAGE`);
export const loadNextPageSuccess = createAction(`${PREFIX}/SUCCESS_NEXT_PAGE`);
export const loadFailed = createAction(`${PREFIX}/FAILED`);

export const actionItemRequest = createAction(`${PREFIX}/ACTION/REQUEST`);
export const actionItemSuccess = createAction(`${PREFIX}/ACTION/SUCCESS`);
export const actionItemError = createAction(`${PREFIX}/ACTION/FAILED`);

export const deleteItemRequest = createAction(`${PREFIX}/DELETE/REQUEST`);
export const deleteItemSuccess = createAction(`${PREFIX}/DELETE/SUCCESS`);
export const deleteItemError = createAction(`${PREFIX}/DELETE/FAILED`);
