import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const initialState: any = {
    component: null,
    show: false,
};

export default handleActions(
    {
        [actions.showModal.toString()]: (state, action) => ({
            component: action.payload,
            show: true,
        }),
        [actions.closeModal.toString()]: () => ({
            ...initialState,
        }),
    },
    initialState
);
