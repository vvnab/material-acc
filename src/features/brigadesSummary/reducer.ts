import { handleActions } from 'redux-actions';
import moment from 'moment';
import * as actions from './actions';
import { IState } from './types';

export const initialState: IState = {
    content: [],
    range: {
        from: moment().add(-1, 'day').startOf('day').toJSON(),
        to: moment().add(-1, 'day').endOf('day').toJSON(),
    },
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
