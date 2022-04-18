import React from 'react';

import styles from './Checkbox.module.scss';

interface Props extends React.HTMLAttributes<HTMLInputElement> {}

const Checkbox = ({ children, ...rest }: Props) => {
    return (
        <label className={styles.wrap}>
            <input type='checkbox' {...rest}/>
            <span className={styles.checkmark}></span>
            <span className={styles.label}>{children}</span>
        </label>
    );
};

export default Checkbox;
