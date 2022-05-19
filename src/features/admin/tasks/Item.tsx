import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleChevronDown as iconDown,
    faCircleChevronUp as iconUp,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import {
    actionItemRequest,
    deleteItemRequest,
    loadCommentsRequest,
} from 'features/tasks/actions';

import moment from 'moment';
import 'moment/locale/ru';
import { ITask } from 'features/tasks/types';
import { showModal, Modal } from 'features/modal';
import CommentForm from './CommentForm';
import { Button } from 'common/components';

import styles from './Item.module.scss';

moment.locale('ru');

const FlowItem: React.FC<ITask> = ({
    id,
    title,
    status,
    createdAt,
    startedAt,
    doneAt,
    employeeCreated,
    brigade,
    description,
    comments,
}) => {
    const [hidden, setHidden] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!hidden) {
            dispatch(loadCommentsRequest({ id }));
        }
    }, [hidden, id, dispatch]);

    const statusClass =
        status === 'CREATED'
            ? styles.created
            : status === 'STARTED'
            ? styles.started
            : styles.done;
    return (
        <>
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
                    {brigade?.title}: {title}
                </div>
                <div className={styles.datetime}>
                    Время создания: {moment(createdAt).format('D MMMM YYYY в HH:mm')} -{' '}
                    {employeeCreated?.fullName}
                </div>
                <div
                    className={[
                        styles.addonPart,
                        hidden ? styles.hidden : '',
                    ].join(' ')}
                >
                    <br />
                    {description && (
                        <div className={styles.remarks}>{description}</div>
                    )}
                    <div className={styles.comments}>
                        {comments &&
                            comments.map(
                                ({
                                    id,
                                    comment,
                                    createdAt,
                                    employeeCreated,
                                }) => (
                                    <div
                                        className={styles.commentWrap}
                                        key={id}
                                    >
                                        <div className={styles.datetime}>
                                            {createdAt &&
                                                moment(createdAt).format(
                                                    'DD MMMM HH:mm'
                                                )}{' '}
                                            - {employeeCreated?.fullName}
                                        </div>
                                        <div className={styles.comment}>
                                            {comment}
                                        </div>
                                    </div>
                                )
                            )}
                    </div>
                    {status !== 'DONE' ? (
                        <div className={styles.buttonGroup}>
                            {status === 'CREATED' ? (
                                <Button
                                    option='dangerous'
                                    onClick={(e) => {
                                        dispatch(deleteItemRequest({ id }));
                                        e.stopPropagation();
                                    }}
                                >
                                    Отменить
                                </Button>
                            ) : (
                                <Button
                                    option='dangerous'
                                    onClick={(e) => {
                                        dispatch(
                                            actionItemRequest({
                                                id: id,
                                                type: 'done',
                                            })
                                        );
                                        e.stopPropagation();
                                    }}
                                >
                                    Завершить
                                </Button>
                            )}
                            <Button
                                onClick={(e) => {
                                    dispatch(
                                        showModal(<CommentForm taskId={id} />)
                                    );
                                    e.stopPropagation();
                                }}
                            >
                                Добавить комментарий
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className={styles.datetime}>
                                Начата:{' '}
                                {moment(startedAt).format('D MMMM YYYY в HH:mm')}
                            </div>
                            <div className={styles.datetime}>
                                Закрыта:{' '}
                                {moment(doneAt).format('D MMMM YYYY в HH:mm')}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Modal />
        </>
    );
};

export default FlowItem;
