import React from 'react';
import { isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown as caretIcon } from '@fortawesome/free-solid-svg-icons';

import styles from './Select.module.scss';

interface Props extends React.HTMLProps<HTMLSelectElement> {
    legend?: string;
    error?: string;
}

const Select: React.FC<Props> = ({
    children,
    multiple,
    legend,
    error,
    ...rest
}) => {
    return (
        <div
            className={[styles.container, error ? styles.error : ''].join(' ')}
        >
            {legend && (
                <legend>
                    {legend}
                    {error && `: ${error?.toLowerCase()}`}
                </legend>
            )}
            <div className={styles.selectContainer}>
                <select
                    {...rest}
                    multiple={multiple}
                    className={[
                        styles.wrap,
                        multiple && !isMobile ? styles.multiple : '',
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
