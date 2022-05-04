import { updateOrUnion } from 'common/utils/updateOrUnion';
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { IState } from './types';

export const initialState: IState = {
    filter: {},
    content: [],
    loading: false,
    error: '',
    itemLoading: false,
    itemError: '',
};

export default handleActions<IState>(
    {
        [(actions.loadRequest.toString(),
        actions.loadNextPageRequest.toString())]: (state) => ({
            ...state,
            loading: true,
        }),
        [actions.loadSuccess.toString()]: (state, action) => ({
            ...state,
            content: action.payload.content,
            pageNumber: action.payload.pageNumber,
            totalPages: action.payload.totalPages,
            loading: false,
            error: '',
        }),
        [actions.loadNextPageSuccess.toString()]: (state, action) => ({
            ...state,
            content: [...state.content, ...action.payload.content],
            pageNumber: action.payload.pageNumber,
            totalPages: action.payload.totalPages,
            loading: false,
            error: '',
        }),
        [actions.loadFailed.toString()]: (state, action: any) => ({
            ...state,
            loading: false,
            error: action.payload.message,
        }),
        [actions.updateFilter.toString()]: (state, action: any) => ({
            ...state,
            loading: true,
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
            content: [...state.content.filter((i) => i.id !== action.payload)],
            itemLoading: false,
            itemError: '',
        }),
    },
    initialState
);
