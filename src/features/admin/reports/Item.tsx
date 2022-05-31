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
import { actionItemRequest } from 'features/reports/actions';

import moment from 'moment';
import 'moment/locale/ru';
import { IReport } from 'features/reports/types';
import { Button, Images } from 'common/components';

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
    photosBefore,
    photosAfter,
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
                Время создания: {moment(createdAt).format('D MMMM YYYY')} -{' '}
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
                    <thead>
                        <tr>
                            <th>тип</th>
                            <th>разметка</th>
                            <th>м</th>
                            <th>м²</th>
                        </tr>
                    </thead>
                    <tbody>
                        {works &&
                            works.map(({ workType, roadSign, volume }) => (
                                <tr
                                    key={`${workType.title}x${roadSign.title}x${volume}`}
                                >
                                    <td>{workType.title}</td>
                                    <td>{roadSign.title}</td>
                                    <td className={styles.number}>{volume}</td>
                                    <td className={styles.number}>
                                        {(volume * roadSign.pmToSqm).toFixed(1)}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className={styles.number}>
                                {works.reduce((s: number, i) => {
                                    s += i.volume;
                                    return s;
                                }, 0)}
                            </td>
                            <td className={styles.number}>
                                {works
                                    .reduce((s: number, i) => {
                                        s += i.volume * i.roadSign.pmToSqm;
                                        return s;
                                    }, 0)
                                    .toFixed(1)}
                            </td>
                        </tr>
                    </tfoot>
                </table>

                {materials && materials.length > 0 && (
                    <table className={styles.table}>
                        <caption>Затраченные материалы</caption>
                        <thead>
                            <tr>
                                <th></th>
                                <th>кг</th>
                                <th>кг/м²</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materials &&
                                materials.map(
                                    ({ quantity, material: { title } }) => (
                                        <tr key={`${title}x${quantity}`}>
                                            <td>{title}</td>
                                            <td className={styles.number}>
                                                {quantity}
                                            </td>
                                            <td className={styles.number}>
                                                {(
                                                    quantity /
                                                    works.reduce(
                                                        (s: number, i) => {
                                                            s +=
                                                                i.volume *
                                                                i.roadSign
                                                                    .pmToSqm;
                                                            return s;
                                                        },
                                                        0
                                                    )
                                                ).toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                )}

                <table className={styles.table}>
                    <caption>Условия</caption>
                    <tbody>
                        <tr>
                            <td>Температура дорожного полотна</td>
                            <td className={styles.number}>{troadStart}</td>
                            <td className={styles.number}>{troadEnd}</td>
                        </tr>
                        <tr>
                            <td>Температура воздуха</td>
                            <td className={styles.number}>{tairStart}</td>
                            <td className={styles.number}>{tairEnd}</td>
                        </tr>
                        <tr>
                            <td>Относительная влажность воздуха</td>
                            <td className={styles.number}>{humStart}</td>
                            <td className={styles.number}>{humEnd}</td>
                        </tr>
                    </tbody>
                </table>

                <Images
                    images={photosBefore}
                    title='Фотографии до проведения работ'
                />
                <Images
                    images={photosAfter}
                    title='Фотографии после проведения работ'
                />

                {remarks && <div className={styles.remarks}>{remarks}</div>}

                <div className={styles.datetime}>#{id}</div>

                {status === 'PUBLISHED' ? (
                    <div className={styles.buttonGroup}>
                        <Button
                            option='dangerous'
                            onClick={(e) => {
                                dispatch(
                                    actionItemRequest({
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
                                    actionItemRequest({
                                        id: id,
                                        type: 'unpublish',
                                    })
                                );
                                e.stopPropagation();
                            }}
                        >
                            Вернуть на редактирование
                        </Button>
                        <Button
                            onClick={(e) => {
                                dispatch(
                                    actionItemRequest({
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
                    (status === 'ACCEPTED' || status === 'REJECTED') && (
                        <div className={styles.datetime}>
                            Резолюция:{' '}
                            {moment(updatedAt).format('D MMMM YYYY в HH:mm')} -{' '}
                            {employeeUpdated?.fullName}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default FlowItem;
