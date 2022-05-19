import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import {
    loadRequest,
    loadNextPageRequest,
    updateFilter,
} from 'features/tasks/actions';

import {
    selectList,
    selectLoading,
    selectError,
} from 'features/tasks/selectors';

import { Loader } from 'common/components';
import { Modal } from 'features/modal';
import TaskItem from './Item';
// import Form from './Form';

import styles from './Tasks.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Reports: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const tasks = useSelector(selectList);
    const { ref, inView } = useInView();

    useEffect(() => {
        dispatch(
            updateFilter({
                statuses: ['CREATED', 'STARTED', 'DONE'],
            })
        );
        dispatch(loadRequest());
    }, [dispatch]);

    useEffect(() => {
        !loading && !error && inView && dispatch(loadNextPageRequest());
    }, [inView, loading, error, dispatch]);

    return (
        <div {...rest} className={styles.wrap}>
            <div className={styles.flows}>
                {tasks &&
                    tasks.map((task) => <TaskItem key={task.id} {...task} />)}
            </div>
            <div ref={ref}></div>
            {loading && <Loader className={styles.loader} />}
            <Modal name='tasks' />
        </div>
    );
};

export default Reports;
