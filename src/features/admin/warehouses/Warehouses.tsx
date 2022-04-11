import React from 'react';

import styles from './Warehouses.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Warehouses: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            <h1>Склады</h1>
            {children}
        </div>
    );
};

export default Warehouses;
