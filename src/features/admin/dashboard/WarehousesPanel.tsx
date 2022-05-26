import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest } from 'features/directories/warehouses/actions';
import {
    selectAll,
    // selectLoading,
    // selectError,
} from 'features/directories/warehouses/selectors';

import styles from './Panel.module.scss';

interface Props extends React.HTMLProps<HTMLFieldSetElement> {
    legend?: string;
}

const WarehousesPanel: React.FC<Props> = ({ children, legend, ...rest }) => {
    const dispatch = useDispatch();
    const warehouses = useSelector(selectAll);

    useEffect(() => {
        dispatch(loadRequest());
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
                                {materials.filter(({quantity}) => quantity > 0).map(
                                    ({ material: { title }, quantity }) => (
                                        <tr>
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
