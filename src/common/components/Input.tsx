import React from 'react';

import styles from './Input.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
    error?: string;
}

const Input: React.FC<Props> = ({ placeholder, error, className, ...rest }) => {
    return (
        <input
            placeholder={placeholder}
            {...rest}
            className={[styles.wrap, className, error ? styles.error : ''].join(
                ' '
            )}
        />
    );
};

export default Input;
