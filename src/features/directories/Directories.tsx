import React from 'react';

import EmployeesPanel from './employees/Panel';

import styles from './Directories.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Directories: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            <EmployeesPanel legend='Сотрудники' />
        </div>
    );
};

export default Directories;
