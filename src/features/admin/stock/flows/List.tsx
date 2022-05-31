import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { loadRequest, loadNextPageRequest } from 'features/flows/actions';
import {
    selectList,
    selectLoading,
    selectError,
} from 'features/flows/selectors';
import { loadRequest as loadWarehousesRequest } from 'features/directories/warehouses/actions';
import { loadRequest as loadBrigadesRequest } from 'features/directories/brigades/actions';
import FilterPanel from './FilterPanel';
import FlowItem from './Item';
import Summary from './Summary';
import { Loader } from 'common/components';

import styles from './List.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Flows: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const list = useSelector(selectList);
    const error = useSelector(selectError);
    const loading = useSelector(selectLoading);
    const { ref, inView } = useInView();

    useEffect(() => {
        inView && dispatch(loadNextPageRequest());
    }, [inView, dispatch]);

    useEffect(() => {
        dispatch(loadRequest());
        dispatch(loadWarehousesRequest());
        dispatch(loadBrigadesRequest());
    }, [dispatch]);

    return (
        <div {...rest} className={styles.wrap}>
            <FilterPanel />
            <div className={styles.list}>
                {list.map((item) => (
                    <FlowItem key={item.id} {...item} />
                ))}
            </div>
            <div ref={ref}></div>
            {loading && <Loader className={styles.loader} />}
            {error && error === 'THE END' ? (
                <Summary data={[...list]} />
            ) : (
                <div className={styles.error}>{error}</div>
            )}
        </div>
    );
};

export default Flows;
