import React from 'react';

import styles from './Select.module.scss';

interface Props extends React.HTMLProps<HTMLSelectElement> {}

const Select: React.FC<Props> = ({ ...rest }) => {
    return <select {...rest} className={styles.wrap} />;
};

export default Select;
