import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest } from './actions';
import { selectList, selectLoading } from './selectors';
import { loadRequest as loadWarehousesRequest } from 'features/directories/warehouses/actions';
import { loadRequest as loadBrigadesRequest } from 'features/directories/brigades/actions';
import FilterPanel from './FilterPanel';
import FlowItem from './Item';
import { Loader } from 'common/components';

import styles from './List.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Flows: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const list = useSelector(selectList);
    const loading = useSelector(selectLoading);
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
            { loading && <Loader className={styles.loader}/>}
        </div>
    );
};

export default Flows;
