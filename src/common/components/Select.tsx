import React from 'React';

import styles from 'Select.module.scss';

interface Props extends React.HTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<Props> = ({ ...rest }) => {
    return <select {...rest} className={styles.wrap} />;
};

export default Select;
