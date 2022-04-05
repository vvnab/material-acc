import React from 'react';
import Panel from './Panel';

import styles from './Dashboard.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Dashboard: React.FC<Props> = ({ ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            {[
                'Выполнено за прошедщие сутки',
                'Расход ГСМ',
                'Перемещение материалов',
                'Бригады',
            ].map((name) => (
                <Panel key={name} legend={name}>
                    <div className={styles.space} />
                </Panel>
            ))}
        </div>
    );
};

export default Dashboard;
