import React from 'react';

import styles from './Settings.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Settings: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            <h1>Настройки</h1>
            {children}
        </div>
    );
};

export default Settings;
