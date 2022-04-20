import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest } from './actions';
import { loadRequest as loadMaterialsRequest } from 'features/directories/materials/actions';
import { loadRequest as loadWarehousesRequest } from 'features/directories/warehouses/actions';
import { loadRequest as loadBrigadesRequest } from 'features/directories/brigades/actions';
import { selectBrigade, selectLoading } from './selectors';
import { Loader } from 'common/components';

import styles from './Warehouse.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Warehouse: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const brigade = useSelector(selectBrigade);
    const loading = useSelector(selectLoading);
    useEffect(() => {
        dispatch(loadRequest());
        dispatch(loadMaterialsRequest());
        dispatch(loadWarehousesRequest());
        dispatch(loadBrigadesRequest());
    }, [dispatch]);
    console.log(brigade)
    return (
        <div {...rest} className={styles.wrap}>
            {loading && <Loader className={styles.loader} />}
            <table className={styles.materials}>
                <tbody>
                    {brigade?.materials?.map(({quantity, material: {id, title}}) => <tr key={id}>
                        <td>{title}</td>
                        <td>{quantity}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default Warehouse;
