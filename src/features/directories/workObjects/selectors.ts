import { createSelector } from 'reselect';

const selectDir = (state: any) => state.dirs.workObjects;

export const isLoading = createSelector(
    selectDir,
    (state) => state.loading
);
export const selectList = createSelector(
    selectDir,
    (state) => state.content
);
export const selectErrorMessage = createSelector(
    selectDir,
    (state) => state.error
);
