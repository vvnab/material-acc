import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const initialState: any = {
    profile: {
        username: '',
        fullName: '',
        role: '',
    },
    bearer: null,
    isAuth: false,
    loading: false,
    error: null,
};

export default handleActions(
    {
        [actions.loginRequest.toString()]: () => ({
            ...initialState,
            loading: true,
        }),
        [actions.loginSuccess.toString()]: (state, action) => ({
            ...state,
            profile: {
                ...action.payload,
            },
            bearer: action.payload.bearer,
            loading: false,
        }),
        [actions.loginFailed.toString()]: (state, action) => ({
            ...initialState,
            error: action.payload.message,
        }),
        [actions.logOut.toString()]: () => ({
            ...initialState,
        }),
    },
    initialState
);
