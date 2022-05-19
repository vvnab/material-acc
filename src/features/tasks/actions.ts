import { createAction } from 'redux-actions';

const PREFIX = 'TASKS';

export const updateFilter = createAction(`${PREFIX}/UPDATE_FILTER`);

export const loadRequest = createAction(`${PREFIX}/REQUEST`);
export const loadSuccess = createAction(`${PREFIX}/SUCCESS`);
export const loadFailed = createAction(`${PREFIX}/FAILED`);

export const loadNextPageRequest = createAction(`${PREFIX}/NEXT_PAGE/REQUEST`);
export const loadNextPageSuccess = createAction(`${PREFIX}/NEXT_PAGE/SUCCESS`);
export const loadNextPageError = createAction(`${PREFIX}/NEXT_PAGE/FAILED`);

export const updateItemRequest = createAction(`${PREFIX}/UPDATE/REQUEST`);
export const updateItemSuccess = createAction(`${PREFIX}/UPDATE/SUCCESS`);
export const updateItemError = createAction(`${PREFIX}/UPDATE/FAILED`);

export const actionItemRequest = createAction(`${PREFIX}/ACTION/REQUEST`);
export const actionItemSuccess = createAction(`${PREFIX}/ACTION/SUCCESS`);
export const actionItemError = createAction(`${PREFIX}/ACTION/FAILED`);

export const deleteItemRequest = createAction(`${PREFIX}/DELETE/REQUEST`);
export const deleteItemSuccess = createAction(`${PREFIX}/DELETE/SUCCESS`);
export const deleteItemError = createAction(`${PREFIX}/DELETE/FAILED`);

export const loadCommentsRequest = createAction(`${PREFIX}/COMMENTS/REQUEST`);
export const loadCommentsSuccess = createAction(`${PREFIX}/COMMENTS/SUCCESS`);
export const loadCommentsError = createAction(`${PREFIX}/COMMENTS/ERROR`);

export const addCommentRequest = createAction(`${PREFIX}/COMMENTS/ADD/REQUEST`);
export const addCommentSuccess = createAction(`${PREFIX}/COMMENTS/ADD/SUCCESS`);
export const addCommentError = createAction(`${PREFIX}/COMMENTS/ADD/ERROR`);

export const deleteCommentRequest = createAction(`${PREFIX}/COMMENTS/DEL/REQUEST`);
export const deleteCommentSuccess = createAction(`${PREFIX}/COMMENTS/DEL/SUCCESS`);
export const deleteCommentError = createAction(`${PREFIX}/COMMENTS/DEL/ERROR`);
