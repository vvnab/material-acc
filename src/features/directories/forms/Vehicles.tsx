import React from 'react';

import styles from './Panel.module.scss';

interface Props extends React.HTMLProps<HTMLFieldSetElement> {
    legend?: string;
}

const Panel: React.FC<Props> = ({ children, legend, ...rest }) => {
    return (
        <fieldset {...rest} className={styles.wrap}>
            {legend && <legend>{legend}</legend>}
            {children}
        </fieldset>
    );
};

export default Panel;
