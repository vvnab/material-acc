import { createAction } from 'redux-actions';

const PREFIX = 'DIRS/MATERIALS';

export const loadRequest = createAction(`${PREFIX}/REQUEST`);

export const loadSuccess = createAction(`${PREFIX}/SUCCESS`);

export const loadFailed = createAction(`${PREFIX}/FAILED`);

export const updateFilter = createAction(`${PREFIX}/UPDATE_FILTER`);
