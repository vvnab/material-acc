import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadRequest as employeesLoad } from 'features/directories/employees/actions';
import { loadRequest as materialsLoad} from 'features/directories/materials/actions';
import { loadRequest as warehousesLoad} from 'features/directories/warehouses/actions';
import { loadRequest as workObjectsLoad} from 'features/directories/workObjects/actions';
import { loadRequest as workTypesLoad} from 'features/directories/workTypes/actions';
import { Outlet } from 'react-router-dom';
import AsidePanel from './AdminAsidePanel/AsidePanel';

import styles from './AdminLayout.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    logout?: () => void;
}

const AdminLayout: React.FC<Props> = ({ logout, ...rest }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(employeesLoad());
        dispatch(materialsLoad());
        dispatch(warehousesLoad());
        dispatch(workObjectsLoad());
        dispatch(workTypesLoad());
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
