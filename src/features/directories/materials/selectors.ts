import { createSelector } from 'reselect';

const selectDir = (state: any) => state.dirs.materials;
export const selectFilter = createSelector(selectDir, (state) => state.filter);
export const selectLoading = createSelector(selectDir, (state) => state.loading);
export const selectList = createSelector(selectDir, (state) =>
    state.filter
        ? state.content.filter(
              ({ title }: any) =>
                  title.toUpperCase().indexOf(state.filter.toUpperCase()) >= 0
          )
        : state.content
);
export const selectError = createSelector(
    selectDir,
    (state) => state.error
);
