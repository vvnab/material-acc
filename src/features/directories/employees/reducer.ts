import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { updateOrUnion } from 'common/utils/updateOrUnion';
import { IState } from './types';

export const initialState: IState = {
    content: [],
    filter: '',
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
        [actions.updateFilter.toString()]: (state, action: any) => ({
            ...state,
            filter: action.payload,
        }),
        [actions.updateItemRequest.toString()]: (state) => ({
            ...state,
            itemLoading: true,
        }),
        [actions.updateItemSuccess.toString()]: (state, action: any) => ({
            ...state,
            content: [...updateOrUnion(state.content, action.payload)],
            itemLoading: false,
            itemError: '',
        }),
        [actions.updateItemError.toString()]: (state, action: any) => ({
            ...state,
            itemLoading: false,
            itemError: action.payload.message,
        }),
        [actions.deleteItemRequest.toString()]: (state) => ({
            ...state,
            itemLoading: true,
        }),
        [actions.deleteItemSuccess.toString()]: (state, action: any) => ({
            ...state,
            content: [
                ...state.content.map((i) =>
                    i.id === action.payload ? { ...i, enabled: false } : i
                ),
            ],
            itemLoading: false,
            itemError: '',
        }),
    },
    initialState
);
