import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown as caretIcon } from '@fortawesome/free-solid-svg-icons';

import styles from './Select.module.scss';

interface Props extends React.HTMLProps<HTMLSelectElement> {}

const Select: React.FC<Props> = ({ children, multiple, ...rest }) => {
    return (
        <div className={styles.container}>
            <select
                {...rest}
                multiple={multiple}
                className={[styles.wrap, multiple ? styles.multiple : ''].join(' ')}
            >
                {children}
            </select>
            {!multiple && (
                <FontAwesomeIcon
                    icon={caretIcon}
                    className={styles.caretIcon}
                />
            )}
        </div>
    );
};

export default Select;
