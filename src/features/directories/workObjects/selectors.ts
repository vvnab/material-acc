import { createSelector } from 'reselect';
import { IState } from './types';

const selectDir = (state: any): IState => state.dirs.workObjects;

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
              ({ title, region, road, contract }) =>
                  title.toUpperCase().indexOf(state.filter.toUpperCase()) >=
                      0 ||
                  (region &&
                      region
                          .toUpperCase()
                          .indexOf(state.filter.toUpperCase()) >= 0) ||
                  (road &&
                      road.toUpperCase().indexOf(state.filter.toUpperCase()) >=
                          0) ||
                  (contract &&
                      contract
                          .toUpperCase()
                          .indexOf(state.filter.toUpperCase()) >= 0)
          )
        : state.content
);

export const selectItem = (id: any) => createSelector(
    selectDir,
    (state) => state.content.find(i => i.id === id)
);
export const selectItemLoading = createSelector(
    selectDir,
    (state) => state.itemLoading
);
export const selectItemError = createSelector(
    selectDir,
    (state) => state.itemError
);

export const selectRegions = createSelector(selectDir, (state) =>
    Array.from(new Set(state.content.map(({ region }) => region)))
);

export const selectRoads = createSelector(selectDir, (state) =>
    Array.from(new Set(state.content.map(({ road }) => road)))
);
