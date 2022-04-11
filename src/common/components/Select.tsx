import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown as caretIcon } from '@fortawesome/free-solid-svg-icons';

import styles from './Select.module.scss';

interface Props extends React.HTMLProps<HTMLSelectElement> {
    legend?: string;
}

const Select: React.FC<Props> = ({ children, multiple, legend, ...rest }) => {
    return (
        <div>
            {legend && <legend>{legend}</legend>}
            <div className={styles.container}>
                <select
                    {...rest}
                    multiple={multiple}
                    className={[
                        styles.wrap,
                        multiple ? styles.multiple : '',
                    ].join(' ')}
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
        </div>
    );
};

export default Select;
