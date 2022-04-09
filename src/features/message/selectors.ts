import { createSelector } from 'reselect';
import _ from 'lodash';
import { IState } from './types';

const selectDir = (state: any): IState => state.message;

export const selectMessage = createSelector(selectDir, (state) =>
    _.last(state.messages)
);

export const selectShow = createSelector(selectDir, (state) => state.show);
