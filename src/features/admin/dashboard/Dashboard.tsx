import React from 'react';
import Panel from './Panel';
import WorkObjectsPanel from './WorkObjectsPanel';

import styles from './Dashboard.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Dashboard: React.FC<Props> = ({ ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            <WorkObjectsPanel
                legend={'Выполнение по объектам'}
            ></WorkObjectsPanel>
            {[
                'Выполнение по бригадам',
                'Перемещение материалов',
                'Расход ГСМ',
            ].map((name) => (
                <Panel key={name} legend={name}>
                </Panel>
            ))}
        </div>
    );
};

export default Dashboard;
