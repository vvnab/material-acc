import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
    loadRequest as loadReportsRequest,
    updateFilter as updateReportsFilter,
} from 'features/reports/actions';

import {
    selectList as selectReports,
    selectLoading as selectReportsLoading,
} from 'features/reports/selectors';

import {
    loadRequest as loadFlowsRequest,
    updateFilter as updateFlowsFilter,
} from 'features/flows/actions';

import {
    selectList as selectFlows,
    selectLoading as selectFlowsLoading,
} from 'features/flows/selectors';

import {
    loadRequest as loadTasksRequest,
    updateFilter as updateTasksFilter,
} from 'features/tasks/actions';

import {
    selectList as selectTasks,
    selectLoading as selectTasksLoading,
} from 'features/tasks/selectors';

import { selectProfile } from 'features/authentication/selectors';
import { Loader, Button } from 'common/components';

import styles from './Dashboard.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Dashboard: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();

    const profile = useSelector(selectProfile);
    const brigadeId = profile?.brigade?.id;
    const reportsLoading = useSelector(selectReportsLoading);
    const flowsLoading = useSelector(selectFlowsLoading);
    const tasksLoading = useSelector(selectTasksLoading);
    const reports = useSelector(selectReports);
    const flows = useSelector(selectFlows).filter(
        (i) => i?.toBrigade?.id === brigadeId
    );
    const tasks = useSelector(selectTasks);

    useEffect(() => {
        dispatch(
            updateReportsFilter({
                statuses: ['CREATED'],
            })
        );
        dispatch(loadReportsRequest());
        dispatch(
            updateFlowsFilter({
                opsTypes: ['BRIGADE_TO_BRIGADE'],
                opsStatuses: ['CREATED'],
            })
        );
        dispatch(loadFlowsRequest());
        dispatch(
            updateTasksFilter({
                statuses: ['CREATED', 'STARTED'],
                brigadeId: brigadeId,
            })
        );
        dispatch(loadTasksRequest());
    }, [dispatch, brigadeId]);

    return (
        <div {...rest} className={styles.wrap}>
            <fieldset>
                <legend>Задачи</legend>
                {tasksLoading ? (
                    <Loader />
                ) : (
                    <>
                        <ul>
                            {tasks.length
                                ? tasks.map((i) => (
                                      <li key={i.id}>
                                          {moment(i.createdAt).format(
                                              'D MMMM YYYY'
                                          )}
                                          {' - '}
                                          {i.title}
                                      </li>
                                  ))
                                : 'OK'}
                        </ul>
                        <Link to='/tasks'>
                            <Button className={styles.button}>
                                Перейти к задачам
                            </Button>
                        </Link>
                    </>
                )}
            </fieldset>

            <fieldset>
                <legend>Отчёты</legend>
                {reportsLoading ? (
                    <Loader />
                ) : (
                    <>
                        <ul>
                            {reports.length
                                ? reports.map((i) => (
                                      <li key={i.id}>
                                          {moment(i.createdAt).format(
                                              'D MMMM YYYY'
                                          )}
                                          {' - '}
                                          {i.workObject?.title}
                                      </li>
                                  ))
                                : 'OK'}
                        </ul>
                        <Link to='/reports'>
                            <Button className={styles.button}>
                                Перейти к отчётам
                            </Button>
                        </Link>
                    </>
                )}
            </fieldset>

            <fieldset>
                <legend>Материалы</legend>
                {flowsLoading ? (
                    <Loader />
                ) : (
                    <>
                        <ul>
                            {flows.length
                                ? flows.map((i) => (
                                      <li key={i.id}>
                                          {moment(i.createdAt).format(
                                              'D MMMM YYYY'
                                          )}
                                          {' - '}
                                          {i?.fromBrigade?.title}
                                      </li>
                                  ))
                                : 'OK'}
                        </ul>
                        <Link to='/warehouse'>
                            <Button className={styles.button}>
                                Перейти к материалам
                            </Button>
                        </Link>
                    </>
                )}
            </fieldset>
        </div>
    );
};

export default Dashboard;
