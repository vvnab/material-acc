import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { IState } from './types';

export const initialState: IState = {
    content: [],
    loading: false,
    error: '',
};

export default handleActions<IState>(
    {
        [actions.loadRequest.toString()]: (state) => ({
            ...state,
            loading: true,
        }),
        [actions.loadSuccess.toString()]: (state, action) => ({
            ...state,
            content: action.payload.content,
            loading: false,
            error: '',
        }),
        [actions.loadFailed.toString()]: (state, action: any) => ({
            ...state,
            loading: false,
            error: action.payload.message,
        }),
    },
    initialState
);
