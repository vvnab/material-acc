import { createAction } from 'redux-actions';

const PREFIX = 'LOGIN';

export const loginRequest = createAction(`${PREFIX}/REQUEST`);

export const loginSuccess = createAction(
    `${PREFIX}/SUCCESS`,
    (payload: any) => payload
);

export const loginFailed = createAction(
    `${PREFIX}/FAILED`,
    (payload: any) => payload
);

export const logOut = createAction(`${PREFIX}/RESET`);
