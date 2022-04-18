import React from 'react';
import { Outlet } from 'react-router-dom';
import { Modal } from 'features/modal';
import Tabs from './Tabs';

import styles from './Menu.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Warehouses: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <>
            <div {...rest} className={styles.wrap}>
                <Tabs
                    items={[
                        { title: 'Перемещения', url: '/stock' },
                        { title: 'Склады', url: '/stock/warehouses' },
                        { title: 'Бригады', url: '/stock/brigades' },
                    ]}
                />
                <div className={styles.inside}>
                    <Outlet />
                </div>
            </div>
            <Modal name="stock"/>
        </>
    );
};

export default Warehouses;
