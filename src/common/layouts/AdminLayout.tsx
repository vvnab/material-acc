import React from 'react';
import { Outlet } from 'react-router-dom';
import AsidePanel from './AdminAsidePanel/AsidePanel';

import styles from './AdminLayout.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    logout?: () => void;
}

const AdminLayout: React.FC<Props> = ({ logout, ...rest }) => {
    return (
        <>
            <AsidePanel logout={logout} />
            <div {...rest} className={styles.wrap}>
                <Outlet />
            </div>
        </>
    );
};

export default AdminLayout;
