import { createSelector } from 'reselect';
import { IState } from './types';

const selectDir = (state: any): IState => state.message;

export const selectMessages = createSelector(
    selectDir,
    (state) => state.messages
);

