import React from 'react';
import moment, { MomentInput } from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays as calendarIcon } from '@fortawesome/free-solid-svg-icons';

import styles from './Datetime.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
    className?: string;
    legend?: string;
    format?: string;
    error?: string | false;
}

const Datetime: React.FC<Props> = ({
    className,
    legend,
    format = 'D MMMM YYYY',
    value,
    error,
    ...rest
}) => {
    return (
        <div
            className={[styles.wrap, error ? styles.error : '', className].join(
                ' '
            )}
        >
            <legend>{legend || ' '}</legend>
            <div className={styles.input}>
                <span>
                    {value
                        ? moment(value as MomentInput).format(format)
                        : 'не установлено'}
                </span>
                <FontAwesomeIcon icon={calendarIcon} className={styles.icon} />
                <input type='date' value={value} {...rest} />
            </div>
        </div>
    );
};

export default Datetime;
