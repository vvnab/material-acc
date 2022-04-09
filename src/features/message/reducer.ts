import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { IState } from './types';

export const initialState: IState = {
    messages: [],
    show: false,
};

export default handleActions(
    {
        [actions.showMessage.toString()]: (state, action: any) => ({
            messages: [...state.messages, action.payload],
            show: true,
        }),
        [actions.hideMessage.toString()]: (state) => ({
            ...state,
            show: false,
        }),
    },
    initialState
);
