import { createAction } from 'redux-actions';

const PREFIX = 'COMMON/MESSAGE';

export const showMessage = createAction(`${PREFIX}/SHOW`);
export const hideMessage = createAction(`${PREFIX}/HIDE`);
