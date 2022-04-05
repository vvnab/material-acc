import { createSelector } from 'reselect';

const selectAuth = (state: any) => state.auth;

export const isLoading = createSelector(selectAuth, (state) => state.loading);
export const selectProfile = createSelector(
    selectAuth,
    (state) => state.profile
);
export const selectBearer = createSelector(selectAuth, (state) => state.bearer);
