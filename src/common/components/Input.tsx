import React from 'React';

import styles from 'Input.module.scss';

interface Props extends React.HTMLAttributes<HTMLInputElement> {}

const Input: React.FC<Props> = ({ ...rest }) => {
    return <input {...rest} className={styles.wrap} />;
};

export default Input;
