import { createAction } from 'redux-actions';

const PREFIX = 'COMMON/MODAL';

export const showModal = createAction(`${PREFIX}/SHOW`);
export const closeModal = createAction(`${PREFIX}/CLOSE`);

// ;(jsx: JSX.Element) => [];
