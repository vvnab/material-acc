import { createSelector } from 'reselect';

const selectDir = (state: any): any => state.modal;

export const selectShow = createSelector(selectDir, (state) => state.show);

export const selectComponent = createSelector(
    selectDir,
    (state) => state.component
);
