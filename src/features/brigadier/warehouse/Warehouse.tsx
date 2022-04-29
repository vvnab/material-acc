import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWarehouse as warehouseIcon,
    faUserNinja as brigadeIcon,
    faRightLeft as exchangeIcon,
    faRightToBracket as incomeIcon,
    faRightFromBracket as outcomeIcon,
} from '@fortawesome/free-solid-svg-icons';
import { showModal } from 'features/modal';
import { loadRequest as loadMaterialsRequest } from 'features/directories/materials/actions';
import { loadRequest as loadWarehousesRequest } from 'features/directories/warehouses/actions';
import { loadRequest as loadBrigadesRequest } from 'features/directories/brigades/actions';
import {
    loadRequest as loadFlowsRequest,
    loadNextPageRequest as loadNextPageFlowRequest,
    updateFilter as updateFlowFilter,
} from 'features/flows/actions';
import {
    selectList as selectFlows,
    selectLoading,
} from 'features/flows/selectors';
import {
    selectItem,
    selectLoading as selectBrigadeWarehouseLoading,
} from 'features/directories/brigades/selectors';
import { selectProfile } from 'features/authentication/selectors';
import { Loader, Button } from 'common/components';
import { Modal } from 'features/modal';
import FlowItem from './Item';
import Form from './Form';

import styles from './Warehouse.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Warehouse: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const brigade = useSelector(selectItem(profile?.brigade?.id));
    const loading = useSelector(selectLoading);
    const brigadeWarehouseLoading = useSelector(selectBrigadeWarehouseLoading);
    const flows = useSelector(selectFlows);
    const { ref, inView } = useInView();

    useEffect(() => {
        dispatch(loadMaterialsRequest());
        dispatch(loadWarehousesRequest());
        dispatch(loadBrigadesRequest());
        dispatch(updateFlowFilter({ opsStatuses: ['CREATED', 'ACCEPTED'] }));
        dispatch(loadFlowsRequest());
    }, [dispatch]);

    useEffect(() => {
        inView && dispatch(loadNextPageFlowRequest());
    }, [inView, dispatch]);

    return (
        <div {...rest} className={styles.wrap}>
            {brigadeWarehouseLoading ? (
                <Loader className={styles.brigadeWarehouseLoader} />
            ) : (
                <table className={styles.materials}>
                    <tbody>
                        {brigade?.materials &&
                            brigade.materials.map(
                                ({ quantity, material: { id, title } }) => (
                                    <tr key={id}>
                                        <td>{title}</td>
                                        <td>{quantity}</td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>
            )}
            <div className={styles.buttonGroup}>
                <Button
                    className={styles.button}
                    onClick={() =>
                        dispatch(showModal(<Form type='requestMaterials' />))
                    }
                >
                    <FontAwesomeIcon icon={warehouseIcon} />
                    <FontAwesomeIcon icon={incomeIcon} />
                </Button>
                <Button
                    className={styles.button}
                    onClick={() =>
                        dispatch(showModal(<Form type='sendToBrigade' />))
                    }
                >
                    <FontAwesomeIcon icon={brigadeIcon} />
                    <FontAwesomeIcon icon={exchangeIcon} />
                </Button>
                <Button
                    className={styles.button}
                    onClick={() =>
                        dispatch(showModal(<Form type='sendToWarehouse' />))
                    }
                >
                    <FontAwesomeIcon icon={warehouseIcon} />
                    <FontAwesomeIcon icon={outcomeIcon} />
                </Button>
            </div>
            <div className={styles.flows}>
                {flows &&
                    flows.map((flow) => <FlowItem key={flow.id} {...flow} />)}
            </div>
            <div ref={ref}></div>
            {loading && <Loader className={styles.loader} />}
            <Modal name='stock' />
        </div>
    );
};

export default Warehouse;
