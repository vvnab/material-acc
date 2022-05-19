import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag as reportIcon } from '@fortawesome/free-solid-svg-icons';
import { showModal } from 'features/modal';

import { loadRequest as loadMaterialsRequest } from 'features/directories/materials/actions';
import { loadRequest as loadWorkTypesRequest } from 'features/directories/workTypes/actions';
import { loadRequest as loadRoadSignsRequest } from 'features/directories/roadSigns/actions';
import { loadRequest as loadWorkObjectsRequest } from 'features/directories/workObjects/actions';
import { loadRequest as loadBrigadesRequest } from 'features/directories/brigades/actions';
import {
    loadRequest as loadReportsRequest,
    loadNextPageRequest as loadNextPageReportsRequest,
    updateFilter as updateReportsFilter,
} from 'features/reports/actions';

import {
    selectList as selectReports,
    selectLoading,
    selectError,
} from 'features/reports/selectors';

import { Loader, Button } from 'common/components';
import { Modal } from 'features/modal';
import ReportItem from './Item';
import Form from './Form';

import styles from './Reports.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Reports: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const flows = useSelector(selectReports);
    const { ref, inView } = useInView();

    useEffect(() => {
        dispatch(
            updateReportsFilter({
                statuses: ['CREATED', 'PUBLISHED', 'ACCEPTED', 'REJECTED'],
            })
        );
        dispatch(loadReportsRequest());
        dispatch(loadMaterialsRequest());
        dispatch(loadWorkTypesRequest());
        dispatch(loadRoadSignsRequest());
        dispatch(loadWorkObjectsRequest({showEnabledOnly: true}));
        dispatch(loadBrigadesRequest());
    }, [dispatch]);

    useEffect(() => {
        !loading && !error && inView && dispatch(loadNextPageReportsRequest());
    }, [inView, loading, error, dispatch]);

    return (
        <div {...rest} className={styles.wrap}>
            <div className={styles.buttonGroup}>
                <Button
                    className={styles.button}
                    onClick={() => dispatch(showModal(<Form />))}
                >
                    <FontAwesomeIcon icon={reportIcon} />
                    <span className={styles.smallText}>
                        Создать новый отчёт
                    </span>
                </Button>
            </div>
            <div className={styles.flows}>
                {flows &&
                    flows.map((flow) => <ReportItem key={flow.id} {...flow} />)}
            </div>
            <div ref={ref}></div>
            {loading && <Loader className={styles.loader} />}
            <Modal name='stock' />
        </div>
    );
};

export default Reports;
