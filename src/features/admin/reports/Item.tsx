import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // faArrowRightLong as arrowIcon,
    // faWarehouse as warehouseIcon,
    // faUserNinja as brigadeIcon,
    // faGlobe as globalIcon,
    // faPersonDigging as workIcon,
    faCircleChevronDown as iconDown,
    faCircleChevronUp as iconUp,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { updateItemRequest } from './actions';

import moment from 'moment';
import 'moment/locale/ru';
import { IReport } from './types';
import { Button } from 'common/components';

import styles from './Item.module.scss';

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
    const [hidden, setHidden] = useState(true);
    const dispatch = useDispatch();

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
            <div>
                {brigade?.title}: {workObject?.region} {workObject?.road}
            </div>
            <div className={styles.datetime}>
                Дата операции: {moment(createdAt).format('D MMMM YYYY')} -{' '}
                {employeeCreated?.fullName}
            </div>
            <div className={styles.datetime}>
                Период работ: {moment(workStart).format('DD MMM YYYY HH:mm')} -{' '}
                {moment(workEnd).format('DD MMM YYYY HH:mm')}
            </div>
            <div
                className={[styles.addonPart, hidden ? styles.hidden : ''].join(
                    ' '
                )}
            >
                <table className={styles.table}>
                    <caption>Проведённые работы</caption>
                    <tbody>
                        {works &&
                            works.map(({ workType, roadSign, volume }) => (
                                <tr
                                    key={`${workType.title}x${roadSign.title}x${volume}`}
                                >
                                    <td>{workType.title}</td>
                                    <td>{roadSign.title}</td>
                                    <td>{volume}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <table className={styles.table}>
                    <caption>Затраченные материалы</caption>
                    <tbody>
                        {materials &&
                            materials.map(
                                ({ quantity, material: { title } }) => (
                                    <tr key={`${title}x${quantity}`}>
                                        <td>{title}</td>
                                        <td>{quantity}</td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>

                <table className={styles.table}>
                    <caption>Условия</caption>
                    <tbody>
                        <tr>
                            <td>Температура дорожного полотна. Начало</td>
                            <td>{troadStart}</td>
                        </tr>
                        <tr>
                            <td>Температура дорожного полотна. Окончание</td>
                            <td>{troadEnd}</td>
                        </tr>
                        <tr>
                            <td>Температура воздуха. Начало</td>
                            <td>{tairStart}</td>
                        </tr>
                        <tr>
                            <td>Температура воздуха. Окончание</td>
                            <td>{tairEnd}</td>
                        </tr>
                        <tr>
                            <td>Относительная влажеость воздуха. Начало</td>
                            <td>{humStart}</td>
                        </tr>
                        <tr>
                            <td>Относительная влажеость воздуха. Окончание</td>
                            <td>{humEnd}</td>
                        </tr>
                    </tbody>
                </table>

                {remarks && <div className={styles.remarks}>{remarks}</div>}

                {status === 'PUBLISHED' ? (
                    <div className={styles.buttonGroup}>
                        <Button
                            option='dangerous'
                            onClick={(e) => {
                                dispatch(
                                    updateItemRequest({
                                        id: id,
                                        type: 'reject',
                                    })
                                );
                                e.stopPropagation();
                            }}
                        >
                            Отменить
                        </Button>
                        <Button
                            onClick={(e) => {
                                dispatch(
                                    updateItemRequest({
                                        id: id,
                                        type: 'accept',
                                    })
                                );
                                e.stopPropagation();
                            }}
                        >
                            Подтвердить
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className={styles.datetime}>
                            Подтверждено:{' '}
                            {moment(updatedAt).format('D MMMM YYYY в HH:mm')} -{' '}
                            {employeeUpdated?.fullName}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FlowItem;
