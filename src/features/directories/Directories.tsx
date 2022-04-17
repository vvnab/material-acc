import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadRequest } from 'features/directories/actions';
import { Modal } from 'features/modal';
import EmployeesPanel from './employees/Panel';
import MaterialsPanel from './materials/Panel';
import WarehousesPanel from './warehouses/Panel';
import WorkObjectsPanel from './workObjects/Panel';
import WorkTypesPanel from './workTypes/Panel';
import VehiclesPanel from './vehicles/Panel';
import BrigadesPanel from './brigades/Panel';

import styles from './Directories.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Directories: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadRequest());
    }, [dispatch]);
    return (
        <div {...rest} className={styles.wrap}>
            <EmployeesPanel legend='Сотрудники' />
            <BrigadesPanel legend='Бригады' />
            <MaterialsPanel legend='Материалы' />
            <VehiclesPanel legend='Транспортные средства' />
            <WarehousesPanel legend='Склады' />
            <WorkTypesPanel legend='Типы работ' />
            <WorkObjectsPanel legend='Рабочие объекты' />
            <Modal />
        </div>
    );
};

export default Directories;
