import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const initialState: any = {
    content: [],
    loading: false,
    error: '',
};

export default handleActions(
    {
        [actions.loadRequest.toString()]: () => ({
            ...initialState,
            loading: true,
        }),
        [actions.loadSuccess.toString()]: (state, action) => ({
            ...state,
            content: action.payload.content,
            loading: false,
        }),
        [actions.loadFailed.toString()]: (state, action) => ({
            ...initialState,
            error: action.payload.message,
        }),
    },
    initialState
);
