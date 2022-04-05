import React from 'react';

import styles from './Input.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {}

const Input: React.FC<Props> = ({ placeholder, className, ...rest }) => {
    return (
        <input
            placeholder={placeholder}
            {...rest}
            className={[styles.wrap, className].join(' ')}
        />
    );
};

export default Input;
