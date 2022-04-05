import React from 'react';
import Panel from './Panel';

import styles from './Directories.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Directories: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            {dirs.map(({ name }) => (
                <Panel legend={name} items={items} />
            ))}
        </div>
    );
};

export default Directories;

const items: any = [
    { id: 1, title: '[br] [x] item 1' },
    { id: 2, title: '[em] [-] item 2' },
    { id: 3, title: '[em] [-] item 3' },
    { id: 4, title: '[em] [x] item 4' },
    { id: 5, title: '[ad] [x] item 5' },
    { id: 6, title: '[br] [x] item 6' },
    { id: 7, title: '[em] [-] item 7' },
    { id: 8, title: '[em] [-] item 8' },
    // { id: 9, title: '[em] [x] item 9' },
    // { id: 10, title: '[ad] [x] item 10' },
    // { id: 11, title: '[br] [x] item 11' },
    // { id: 12, title: '[em] [-] item 12' },
    // { id: 13, title: '[em] [-] item 13' },
    // { id: 14, title: '[em] [x] item 14' },
    // { id: 15, title: '[ad] [x] item 15' },

];

const dirs = [
    {
        name: 'Сотрудники',
        url: '/employees',
        getTitle: ({ fullName, role, brigadeMaster, enabled }: any) =>
            `${fullName}`,
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
