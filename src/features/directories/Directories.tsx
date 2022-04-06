import React from 'react';
import Panel from './Panel';
import * as employeesSelectors from './employees/selectors';
import * as materialsSelectors from './materials/selectors';
import * as warehousesSelectors from './warehouses/selectors';
import * as workObjectsSelectors from './workObjects/selectors';
import * as workTypesSelectors from './workTypes/selectors';

import styles from './Directories.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Directories: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            {dirs.map(
                ({
                    name,
                    getTitle,
                    selectErrorMessage,
                    selectList,
                    isLoading,
                }) => (
                    <Panel
                        selectErrorMessage={selectErrorMessage}
                        selectList={selectList}
                        isLoading={isLoading}
                        legend={name}
                        getTitle={getTitle}
                        key={name}
                    />
                )
            )}
        </div>
    );
};

export default Directories;

const roles: any = {
    ROLE_ADMIN: '[a]',
    ROLE_BRIGADIER: '[b]',
    ROLE_EMPLOYEE: '[e]',
};

const dirs = [
    {
        name: 'Сотрудники',
        getTitle: ({ fullName, role, enabled }: any) =>
            `${enabled ? '[v]' : '[x]'} ${roles[role]} ${fullName}`,
        ...employeesSelectors,
    },
    {
        name: 'Материалы',
        getTitle: ({ title }: any) => `${title}`,
        ...materialsSelectors,
    },
    {
        name: 'Склады',
        getTitle: ({ title }: any) => `${title}`,
        ...warehousesSelectors,
    },
    {
        name: 'Рабочие объекты',
        getTitle: ({ title }: any) => `${title}`,
        ...workObjectsSelectors,
    },
    {
        name: 'Типы работ',
        getTitle: ({ title }: any) => `${title}`,
        ...workTypesSelectors,
    },
];
