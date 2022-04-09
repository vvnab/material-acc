import { createSelector } from 'reselect';

const selectAuth = (state: any) => state.auth;

export const selectLoading = createSelector(selectAuth, (state) => state.loading);
export const isAuth = createSelector(selectAuth, (state) => state.isAuth);
export const selectProfile = createSelector(
    selectAuth,
    (state) => state.profile
);
export const selectBearer = createSelector(selectAuth, (state) => state.bearer);
export const selectError = createSelector(
    selectAuth,
    (state) => state.error
);
