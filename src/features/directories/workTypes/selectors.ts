import { createSelector } from 'reselect';

const selectDir = (state: any) => state.dirs.workTypes;
export const selectFilter = createSelector(selectDir, (state) => state.filter);
export const selectLoading = createSelector(selectDir, (state) => state.loading);
export const selectList = createSelector(selectDir, (state) =>
    state.filter
        ? state.content.filter(
              ({ title }: any) => title.indexOf(state.filter) >= 0
          )
        : state.content
);
export const selectError = createSelector(
    selectDir,
    (state) => state.error
);
