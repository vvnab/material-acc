import React from 'react';

import styles from './Input.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
    error?: string | false;
    legend?: string;
    dataList?: any;
    inputClassName?: string;
}

const Input: React.FC<Props> = ({
    placeholder,
    dataList,
    legend,
    error,
    name,
    className,
    inputClassName,
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
            <input
                placeholder={placeholder}
                name={name}
                id={name}
                className={inputClassName}
                {...rest}
            />
            {dataList && (
                <datalist id={name}>
                    {dataList.map((i: string) => (
                        <option>{i}</option>
                    ))}
                </datalist>
            )}
        </div>
    );
};

export default Input;
