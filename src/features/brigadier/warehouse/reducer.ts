import { IBrigade } from 'features/directories/brigades/types';
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { IState } from './types';

export const initialState: IState = {
    content: {},
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
        [actions.loadSuccess.toString()]: (state, action: any) => ({
            ...state,
            content: action.payload as IBrigade,
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
