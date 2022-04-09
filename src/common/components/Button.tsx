import React from 'react';

import styles from './Button.module.scss';

interface Props extends React.HTMLProps<HTMLButtonElement> {
    className?: string;
    option?: 'default' | 'dangerous';
    type?: any;
}

const Button: React.FC<Props> = ({
    className,
    type,
    option = 'default',
    ...rest
}) => {
    return (
        <button
            className={[styles.wrap, styles[option], className].join(' ')}
            type={type}
            {...rest}
        />
    );
};

export default Button;
