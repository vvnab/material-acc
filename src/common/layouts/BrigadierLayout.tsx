import React from 'react';

import styles from './BrigadierLayout.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const BrigadierLayout: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            {children}
        </div>
    );
};

export default BrigadierLayout;
