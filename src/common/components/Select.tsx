import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown as caretIcon } from '@fortawesome/free-solid-svg-icons';

import styles from './Select.module.scss';

interface Props extends React.HTMLProps<HTMLSelectElement> {}

const Select: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <>
            <select {...rest} className={styles.wrap}>
                {children}
            </select>
            <FontAwesomeIcon icon={caretIcon} className={styles.caretIcon}/>
        </>
    );
};

export default Select;
