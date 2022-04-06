import React from 'react';
import Panel from './employees/Panel';

import styles from './Directories.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Directories: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            {dirs.map(({ name, getTitle }) => (
                <Panel
                    legend={name}
                    getTitle={getTitle}
                    key={name}
                />
            ))}
        </div>
    );
};

export default Directories;

const roles: any = {
    ROLE_ADMIN: "[a]",
    ROLE_BRIGADIER: "[b]",
    ROLE_EMPLOYEE: "[e]"
}

const dirs = [
    {
        name: 'Сотрудники',
        url: '/employees',
        getTitle: ({ fullName, role, enabled }: any) =>
            `${enabled ? "[v]" : "[x]"} ${roles[role]} ${fullName}`,
    },
    {
        name: 'Материалы',
        url: '/materials',
        getTitle: ({ title }: any) => `${title}`,
    },
    {
        name: 'Склады',
        url: '/warehouses',
        getTitle: ({ title }: any) => `${title}`,
    },
    {
        name: 'Рабочие объекты',
        url: '/workObjects',
        getTitle: ({ title }: any) => `${title}`,
    },
    {
        name: 'Типы работ',
        url: '/workTypes',
        getTitle: ({ title }: any) => `${title}`,
    },
];
