import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest } from 'features/directories/brigades/actions';
import { loadRequest as loadMaterialsRequest } from 'features/directories/materials/actions';
import { loadRequest as loadWarehousesRequest } from 'features/directories/warehouses/actions';
import { selectList, selectLoading } from 'features/directories/brigades/selectors';
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
        dispatch(loadMaterialsRequest());
        dispatch(loadWarehousesRequest());
    }, [dispatch]);
    return (
        <div {...rest} className={styles.wrap}>
            {loading && <Loader className={styles.loader} />}
            <div className={styles.list}>
                {list.map((item) => (
                    <FlowItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Flows;
