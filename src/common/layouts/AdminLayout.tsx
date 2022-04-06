import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadRequest } from 'features/directories/actions';
import { Outlet } from 'react-router-dom';
import AsidePanel from './AdminAsidePanel/AsidePanel';

import styles from './AdminLayout.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    logout?: () => void;
}

const AdminLayout: React.FC<Props> = ({ logout, ...rest }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadRequest());
    }, [dispatch]);

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
