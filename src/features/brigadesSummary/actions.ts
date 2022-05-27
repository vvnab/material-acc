import { createAction } from 'redux-actions';

const PREFIX = 'BRIGADES_SUMMARY';

export const loadRequest = createAction(`${PREFIX}/REQUEST`);
export const loadSuccess = createAction(`${PREFIX}/SUCCESS`);
export const loadFailed = createAction(`${PREFIX}/FAILED`);
