import React from 'react';

import styles from './Error.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    className?: string;
}

const Error: React.FC<Props> = ({ className, children, ...rest }) => {
    return (
        <div className={[styles.wrap, className].join(' ')} {...rest}>
            {children}
        </div>
    );
};

export default Error;
