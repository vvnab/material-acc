import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTurnDown as arrowIcon,
    faWarehouse as warehouseIcon,
    faUserNinja as brigadeIcon,
    faGlobe as globalIcon,
    faPersonDigging as workIcon,
    faCircleChevronDown as iconDown,
    faCircleChevronUp as iconUp,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectBrigade } from './selectors';
import { updateItemRequest } from 'features/admin/stock/flows/actions';

import moment from 'moment';
import 'moment/locale/ru';
import { Button } from 'common/components';

import styles from './Item.module.scss';
import { IReport } from 'features/admin/reports/types';

moment.locale('ru');

const FlowItem: React.FC<IReport> = ({
    id,
    status,
    createdAt,
    updatedAt,
    materials,
    works,
    employeeCreated,
    employeeUpdated,
    workStart,
    workEnd,
    workObject,
    brigade,
    troadStart,
    troadEnd,
    humStart,
    humEnd,
    tairStart,
    tairEnd,
    remarks,
}) => {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(true);
    const statusClass =
        status === 'CREATED'
            ? styles.created
            : status === 'ACCEPTED'
            ? styles.accepted
            : status === 'PUBLISHED'
            ? styles.published
            : styles.rejected;
    return (
        <div
            className={[styles.wrap, statusClass].join(' ')}
            onClick={() => {
                setHidden(!hidden);
            }}
        >
            <div className={styles.down}>
                <FontAwesomeIcon icon={hidden ? iconDown : iconUp} />
            </div>
            <div className={styles.datetime}>
                Дата операции: {moment(createdAt).format('D MMMM YYYY')} -{' '}
                {employeeCreated?.fullName}
            </div>
            <div
                className={[styles.addonPart, hidden ? styles.hidden : ''].join(
                    ' '
                )}
            >
                <table className={styles.table}>
                    <tbody>
                        {materials.map(({ quantity, material: { title } }) => (
                            <tr key={`${title}x${quantity}`}>
                                <td>{title}</td>
                                <td>{quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <>
                    <div className={styles.datetime}>
                        Создано:{' '}
                        {moment(createdAt).format('D MMMM YYYY в HH:mm')} -{' '}
                        {employeeCreated?.fullName}
                    </div>
                    {updatedAt && (
                        <div className={styles.datetime}>
                            Подтверждено:{' '}
                            {moment(updatedAt).format('D MMMM YYYY в HH:mm')} -{' '}
                            {employeeUpdated?.fullName}
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

export default FlowItem;
