import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays as calendarIcon } from '@fortawesome/free-solid-svg-icons';

import styles from './Datetime.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
    className?: string;
    legend?: string;
    date?: string;
    format?: string;
}

const Datetime: React.FC<Props> = ({
    className,
    legend,
    date,
    format = 'D MMMM YYYY',
    ...rest
}) => {
    return (
        <div className={[styles.wrap, className].join(' ')}>
            <legend>{legend || ' '}</legend>
            <div className={styles.input}>
                <span>
                    {date ? moment(date).format(format) : 'не установлено'}
                </span>
                <FontAwesomeIcon icon={calendarIcon} className={styles.icon} />
                <input type='date' value={date} {...rest} />
            </div>
        </div>
    );
};

export default Datetime;
