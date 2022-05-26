import React from 'react';
import WorkObjectsPanel from './WorkObjectsPanel';
import BrigadesPanel from './BrigadesPanel';
import WarehousesPanel from './WarehousesPanel';
import FuelPanel from './FuelPanel';

import styles from './Dashboard.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Dashboard: React.FC<Props> = ({ ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            <WorkObjectsPanel
                legend={'Выполнение по объектам'}
            ></WorkObjectsPanel>
            <BrigadesPanel legend='Выполнение по бригадам'></BrigadesPanel>
            <WarehousesPanel legend='Остатки материалов'></WarehousesPanel>
            <FuelPanel legend='Расход ГСМ'></FuelPanel>
        </div>
    );
};

export default Dashboard;
