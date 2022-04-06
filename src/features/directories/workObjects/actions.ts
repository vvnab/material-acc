import { createAction } from 'redux-actions';

const PREFIX = 'DIRS/WORKOBJECTS';

export const loadRequest = createAction(`${PREFIX}/REQUEST`);

export const loadSuccess = createAction(
    `${PREFIX}/SUCCESS`,
    (payload: any) => payload
);

export const loadFailed = createAction(
    `${PREFIX}/FAILED`,
    (payload: any) => payload
);
