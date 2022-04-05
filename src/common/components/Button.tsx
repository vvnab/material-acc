import React from 'react';

import styles from './Button.module.scss';

interface Props extends React.HTMLProps<HTMLButtonElement> {
    className?: string;
    type?: any;
}

const Button: React.FC<Props> = ({ className, type, ...rest }) => {
    return (
        <button
            className={[styles.wrap, className].join(' ')}
            type={type}
            {...rest}
        />
    );
};

export default Button;
