import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleChevronDown as iconDown,
    faCircleChevronUp as iconUp,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    actionItemRequest,
    delPhotoRequest,
    addPhotoRequest,
} from 'features/reports/actions';
import { selectItemLoading } from 'features/reports/selectors';
import { showModal } from 'features/modal';
import Form from './Form';

import moment from 'moment';
import 'moment/locale/ru';
import { Button, Images, Loader } from 'common/components';

import styles from './Item.module.scss';
import { IReport } from 'features/reports/types';

moment.locale('ru');

const FlowItem: React.FC<IReport> = (report) => {
    const dispatch = useDispatch();
    const {
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
        troadStart,
        troadEnd,
        humStart,
        humEnd,
        tairStart,
        tairEnd,
        remarks,
        photosBefore,
        photosAfter,
    } = report;

    const loading = useSelector(selectItemLoading);
    const [hidden, setHidden] = useState(true);
    const [files, setFiles] = useState<any>();

    const statusClass =
        status === 'CREATED'
            ? styles.created
            : status === 'ACCEPTED'
            ? styles.accepted
            : status === 'PUBLISHED'
            ? styles.published
            : styles.rejected;
    return (
        <>
            {loading && <Loader className={styles.loader} />}
            <div
                className={[styles.wrap, statusClass].join(' ')}
                onClick={() => {
                    setHidden(!hidden);
                }}
            >
                <div className={styles.down}>
                    <FontAwesomeIcon icon={hidden ? iconDown : iconUp} />
                </div>
                <div className={styles.title}>
                    {moment(createdAt).format('D MMMM YYYY')} -{' '}
                    {workObject?.title}
                </div>

                <div className={styles.datetime}>
                    С {moment(workStart).format('D MMM HH:mm')} по{' '}
                    {moment(workEnd).format('D MMM HH:mm')}
                </div>

                <div
                    className={[
                        styles.addonPart,
                        hidden ? styles.hidden : '',
                    ].join(' ')}
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
                            {works.map(
                                ({
                                    volume,
                                    workType: { title: workType },
                                    roadSign: { title: roadSign, pmToSqm },
                                }) => (
                                    <tr
                                        key={`${workType}x${roadSign}x${volume}`}
                                    >
                                        <td>{workType}</td>
                                        <td>{roadSign}</td>
                                        <td className={styles.number}>
                                            {volume}
                                        </td>
                                        <td className={styles.number}>
                                            {(volume * pmToSqm).toFixed(1)}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>

                    {materials && materials.length > 0 && (
                        <table className={styles.table}>
                            <caption>Затраченные материалы</caption>
                            <tbody>
                                {materials.map(
                                    ({ quantity, material: { title } }) => (
                                        <tr key={`${title}x${quantity}`}>
                                            <td>{title}</td>
                                            <td className={styles.number}>
                                                {quantity}
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
                        del={(photoId: number) =>
                            dispatch(delPhotoRequest({ id, photoId }))
                        }
                    />

                    <input
                        type='file'
                        multiple
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            setFiles(e.currentTarget.files);
                            dispatch(
                                addPhotoRequest({
                                    id: id,
                                    type: 'BEFORE',
                                    files: e.currentTarget.files,
                                })
                            );
                        }}
                    />

                    <Images
                        images={photosAfter}
                        title='Фотографии после проведения работ'
                        del={(photoId: number) =>
                            dispatch(delPhotoRequest({ id, photoId }))
                        }
                    />
                    <input
                        type='file'
                        multiple
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            setFiles(e.currentTarget.files);
                            dispatch(
                                addPhotoRequest({
                                    id: id,
                                    type: 'AFTER',
                                    files: e.currentTarget.files,
                                })
                            );
                        }}
                    />

                    {remarks && <div className={styles.remarks}>{remarks}</div>}
                    <>
                        <div className={styles.datetime}>
                            Создано:{' '}
                            {moment(createdAt).format('D MMMM YYYY в HH:mm')} -{' '}
                            {employeeCreated?.fullName}
                        </div>
                        {updatedAt && status === 'ACCEPTED' && (
                            <div className={styles.datetime}>
                                Подтверждено:{' '}
                                {moment(updatedAt).format(
                                    'D MMMM YYYY в HH:mm'
                                )}{' '}
                                - {employeeUpdated?.fullName}
                            </div>
                        )}
                    </>
                    {status === 'CREATED' && (
                        <div className={styles.buttonGroup}>
                            <Button
                                // option="dangerous"
                                onClick={(e) => {
                                    dispatch(
                                        showModal(<Form report={report} />)
                                    );
                                    e.stopPropagation();
                                }}
                            >
                                Редактировать
                            </Button>
                            <Button
                                onClick={(e) => {
                                    dispatch(
                                        actionItemRequest({
                                            id: id,
                                            type: 'publish',
                                        })
                                    );

                                    e.stopPropagation();
                                }}
                            >
                                Опубликовать
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FlowItem;
