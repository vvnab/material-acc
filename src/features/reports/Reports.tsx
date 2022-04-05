import React from 'react';

import styles from './Reports.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Reports: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            <h1>Отчёты</h1>
            {children}
        </div>
    );
};

export default Reports;
