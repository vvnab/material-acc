import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './BrigadierMenu/Header';

import styles from './BrigadierLayout.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    logout?: () => void;
}

const BrigadierLayout: React.FC<Props> = ({ logout, ...rest }) => {
    return (
        <>
            <Header logout={logout} />
            <div {...rest} className={styles.wrap}>!!!
                <Outlet />
            </div>
        </>
    );
};

export default BrigadierLayout;
