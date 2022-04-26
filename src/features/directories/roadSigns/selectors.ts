import { createSelector } from 'reselect';
import { IState } from './types';

const selectDir = (state: any): IState => state.dirs.roadSigns;

export const selectLoading = createSelector(
    selectDir,
    (state) => state.loading
);
export const selectError = createSelector(selectDir, (state) => state.error);
export const selectFilter = createSelector(selectDir, (state) => state.filter);
export const selectAll = createSelector(selectDir, (state) => state.content);
export const selectList = createSelector(selectDir, (state) =>
    state.filter
        ? state.content.filter(
              ({ title }) =>
                  title.toUpperCase().indexOf(state.filter.toUpperCase()) >=
                  0
          )
        : state.content
);
export const selectItemLoading = createSelector(
    selectDir,
    (state) => state.itemLoading
);
export const selectItemError = createSelector(
    selectDir,
    (state) => state.itemError
);
