import { createAction } from 'redux-actions';

const PREFIX = 'COMMON/MESSAGE';

export const showMessage = createAction(`${PREFIX}/SHOW`);
export const addMessage = createAction(`${PREFIX}/ADD`);
export const updateMessages = createAction(`${PREFIX}/UPDATE`);
export const hideMessage = createAction(`${PREFIX}/HIDE`);
