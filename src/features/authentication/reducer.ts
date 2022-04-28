import { handleActions } from 'redux-actions';
import * as actions from './actions';

export const initialState: any = {
    profile: {
        username: '',
        fullName: '',
        phone: '',
        email: '',
        role: '',
        id: 0,
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
                fullName: action.payload.fullName,
                username: action.payload.username,
                phone: action.payload.phone,
                email: action.payload.email,
                brigade: action.payload.brigade,
                role: action.payload.role,
                id: action.payload.id,
            },
            loading: false,
            isAuth: true,
            bearer: action.payload.bearer,
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
