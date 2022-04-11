import React from 'react';

import styles from './Input.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
    error?: string;
    legend?: string;
}

const Input: React.FC<Props> = ({
    placeholder,
    legend,
    error,
    className,
    ...rest
}) => {
    return (
        <div
            className={[styles.wrap, className, error ? styles.error : ''].join(
                ' '
            )}
        >
            {legend && (
                <legend className={styles.legend}>
                    {legend}
                    {error && `: ${error?.toLowerCase()}`}
                </legend>
            )}
            <input placeholder={placeholder} {...rest} />
        </div>
    );
};

export default Input;
