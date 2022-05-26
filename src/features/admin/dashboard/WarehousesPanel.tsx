import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest as warehousesLoadRequest } from 'features/directories/warehouses/actions';
import { loadRequest as brigadesLoadRequest } from 'features/directories/brigades/actions';
import { selectAll as selectWarehouses } from 'features/directories/warehouses/selectors';
import { selectList as selectBrigades } from 'features/directories/brigades/selectors';

import styles from './Panel.module.scss';

interface Props extends React.HTMLProps<HTMLFieldSetElement> {
    legend?: string;
}

const WarehousesPanel: React.FC<Props> = ({ children, legend, ...rest }) => {
    const dispatch = useDispatch();
    const warehouses = useSelector(selectWarehouses);
    const brigades = useSelector(selectBrigades);

    useEffect(() => {
        dispatch(warehousesLoadRequest());
        dispatch(brigadesLoadRequest());
    }, [dispatch]);

    return (
        <fieldset {...rest} className={styles.wrap}>
            {legend && <legend>{legend}</legend>}
            <div>
                {warehouses.map(({ title, materials }) => (
                    <div className={styles.item} key={title}>
                        <div className={styles.title}>{title}</div>
                        <table className={styles.elements}>
                            <tbody>
                                {materials
                                    .filter(({ quantity }) => quantity > 0)
                                    .map(
                                        ({ material: { title }, quantity }) => (
                                            <tr key={title}>
                                                <td>{title}</td>
                                                <td className={styles.number}>
                                                    {quantity}
                                                </td>
                                            </tr>
                                        )
                                    )}
                            </tbody>
                        </table>
                    </div>
                ))}

                {brigades.map(({ id, title, materials }) => (
                    <div className={styles.item} key={id}>
                        <div className={styles.title}>{title}</div>
                        <table className={styles.elements}>
                            <tbody>
                                {materials
                                    .filter(({ quantity }) => quantity > 0)
                                    .map(
                                        ({ material: { title }, quantity }) => (
                                            <tr key={title}>
                                                <td>{title}</td>
                                                <td className={styles.number}>
                                                    {quantity}
                                                </td>
                                            </tr>
                                        )
                                    )}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </fieldset>
    );
};

export default WarehousesPanel;
