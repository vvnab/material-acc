import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWarehouse as warehouseIcon,
    faUserNinja as brigadeIcon,
    faRightLeft as exchangeIcon,
    faRightToBracket as incomeIcon,
    faRightFromBracket as outcomeIcon,
} from '@fortawesome/free-solid-svg-icons';
import { loadRequest } from './actions';
import { showModal } from 'features/modal';
import { loadRequest as loadMaterialsRequest } from 'features/directories/materials/actions';
import { loadRequest as loadWarehousesRequest } from 'features/directories/warehouses/actions';
import { loadRequest as loadBrigadesRequest } from 'features/directories/brigades/actions';
import { loadRequest as loadFlowsRequest } from 'features/admin/stock/flows/actions';
import { selectList as selectFlows } from 'features/admin/stock/flows/selectors';
import { selectBrigade, selectLoading } from './selectors';
import { Loader, Button } from 'common/components';
import { Modal } from 'features/modal';
import FlowItem from './Item';
import Form from './Form';

import styles from './Warehouse.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Warehouse: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const brigade = useSelector(selectBrigade);
    const loading = useSelector(selectLoading);
    const flows = useSelector(selectFlows);
    useEffect(() => {
        dispatch(loadRequest());
        dispatch(loadMaterialsRequest());
        dispatch(loadWarehousesRequest());
        dispatch(loadBrigadesRequest());
        dispatch(loadFlowsRequest({ loadAll: true }));
    }, [dispatch]);
    return (
        <div {...rest} className={styles.wrap}>
            {loading ? (
                <Loader className={styles.loader} />
            ) : (
                <>
                    <table className={styles.materials}>
                        <tbody>
                            {brigade?.materials?.map(
                                ({ quantity, material: { id, title } }) => (
                                    <tr key={id}>
                                        <td>{title}</td>
                                        <td>{quantity}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    <div className={styles.buttonGroup}>
                        <Button
                            className={styles.button}
                            onClick={() =>
                                dispatch(
                                    showModal(<Form type='requestMaterials' />)
                                )
                            }
                        >
                            <FontAwesomeIcon icon={warehouseIcon} />
                            <FontAwesomeIcon icon={incomeIcon} />
                        </Button>
                        <Button
                            className={styles.button}
                            onClick={() =>
                                dispatch(
                                    showModal(<Form type='sendToBrigade' />)
                                )
                            }
                        >
                            <FontAwesomeIcon icon={brigadeIcon} />
                            <FontAwesomeIcon icon={exchangeIcon} />
                        </Button>
                        <Button
                            className={styles.button}
                            onClick={() =>
                                dispatch(
                                    showModal(<Form type='sendToWarehouse' />)
                                )
                            }
                        >
                            <FontAwesomeIcon icon={warehouseIcon} />
                            <FontAwesomeIcon icon={outcomeIcon} />
                        </Button>
                    </div>
                    <div className={styles.flows}>
                        {flows &&
                            flows.map((flow) => (
                                <FlowItem key={flow.id} {...flow} />
                            ))}
                    </div>
                </>
            )}
            <Modal name='stock' />
        </div>
    );
};

export default Warehouse;
