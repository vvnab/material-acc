import { createAction } from 'redux-actions';

const PREFIX = 'BRIGADIER';

export const loadRequest = createAction(`${PREFIX}/REQUEST`);
export const loadSuccess = createAction(`${PREFIX}/SUCCESS`);
export const loadFailed = createAction(`${PREFIX}/FAILED`);
export const updateFilter = createAction(`${PREFIX}/UPDATE_FILTER`);


export const updateItemRequest = createAction(`${PREFIX}/UPDATE/REQUEST`);
export const updateItemSuccess = createAction(`${PREFIX}/UPDATE/SUCCESS`);
export const updateItemError = createAction(`${PREFIX}/UPDATE/FAILED`);

export const deleteItemRequest = createAction(`${PREFIX}/DELETE/REQUEST`);
export const deleteItemSuccess = createAction(`${PREFIX}/DELETE/SUCCESS`);
export const deleteItemError = createAction(`${PREFIX}/DELETE/FAILED`);
