import { createSelector } from 'reselect';
import { sortBy } from 'lodash';
import { IState, ROLES } from './types';

const selectDir = (state: any): IState => state.dirs.employees;

export const selectLoading = createSelector(
    selectDir,
    (state) => state.loading
);
export const selectError = createSelector(selectDir, (state) => state.error);
export const selectFilter = createSelector(selectDir, (state) => state.filter);
export const selectList = createSelector(selectDir, (state) =>
    sortBy(
        state.filter
            ? state.content.filter(
                  ({ fullName, role }) =>
                      fullName
                          .toUpperCase()
                          .indexOf(state.filter.toUpperCase()) >= 0 ||
                      ROLES.find((i: any) => i.value === role)
                          .title.toUpperCase()
                          .indexOf(state.filter.toUpperCase()) >= 0
              )
            : state.content,
        ['role', 'fullName']
    )
);
export const selectItemLoading = createSelector(
    selectDir,
    (state) => state.itemLoading
);
export const selectItemError = createSelector(
    selectDir,
    (state) => state.itemError
);

export const selectBrigadiers = (brigadeId?: number) =>
    createSelector(selectDir, (state) =>
        sortBy(
            state.content.filter(
                (i) =>
                    i.enabled &&
                    i.role === 'ROLE_BRIGADIER' &&
                    (!i.brigade?.id || i.brigade?.id === brigadeId)
            ),
            ['fullName']
        )
    );

export const selectEmployees = (brigadeId?: number) =>
    createSelector(selectDir, (state) =>
        sortBy(
            state.content.filter(
                (i) =>
                    i.enabled &&
                    i.role === 'ROLE_EMPLOYEE' &&
                    (!i.brigade?.id || i.brigade?.id === brigadeId)
            ),
            ['fullName']
        )
    );
