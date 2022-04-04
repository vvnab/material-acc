import React from 'react';

import styles from './Input.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
}

const Input: React.FC<Props> = ({ placeholder, ...rest }) => {
    return <input placeholder={placeholder} {...rest} className={styles.wrap} />;
};

export default Input;
