import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { IState } from './types';
// import { updateOrUnion } from 'common/utils/updateOrUnion';

export const initialState: IState = {
    filter: undefined,
    content: [],
    loading: false,
    error: '',
    itemLoading: false,
    itemError: '',
};

export default handleActions<IState>(
    {
        [actions.loadRequest.toString()]: () => ({
            ...initialState,
            loading: true,
        }),
        [actions.loadSuccess.toString()]: (state, action) => ({
            ...state,
            content: action.payload.content,
            loading: false,
            error: '',
        }),
        [actions.loadFailed.toString()]: (state, action: any) => ({
            ...initialState,
            loading: false,
            error: action.payload.message,
        }),
    },
    initialState
);
