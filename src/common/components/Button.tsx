import React from 'react';

import styles from './Button.module.scss';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<Props> = ({ ...rest }) => {
    return <button {...rest} className={styles.wrap} />;
};

export default Button;
