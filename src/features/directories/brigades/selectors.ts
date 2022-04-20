import { createSelector } from 'reselect';
import { IState } from './types';

const selectDir = (state: any): IState => state.dirs.brigades;

export const selectLoading = createSelector(
    selectDir,
    (state) => state.loading
);
export const selectError = createSelector(selectDir, (state) => state.error);
export const selectFilter = createSelector(selectDir, (state) => state.filter);
export const selectList = createSelector(selectDir, (state) =>
    (state.filter
        ? state.content.filter(
              ({ title }) =>
                  title &&
                  title.toUpperCase().indexOf(state.filter.toUpperCase()) >= 0
          )
        : state.content
    ).map((i) => ({ ...i }))
);

export const selectAll = createSelector(selectDir, (state) =>
    state.content.map((i) => ({ ...i }))
);

export const selectItemLoading = createSelector(
    selectDir,
    (state) => state.itemLoading
);
export const selectItemError = createSelector(
    selectDir,
    (state) => state.itemError
);
