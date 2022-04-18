import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft as arrowInIcon,
    faArrowRight as arrowOutIcon,
    faWarehouse as warehouseIcon,
} from '@fortawesome/free-solid-svg-icons';
import { showModal } from 'features/modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemRequest } from './actions';
import Form from './Form';
import moment from 'moment';
import 'moment/locale/ru';
import { IWarehouse } from './types';
import { Button } from 'common/components';
import { selectAll } from 'features/directories/materials/selectors';

import styles from './Item.module.scss';

moment.locale('ru');

const FlowItem: React.FC<IWarehouse> = ({ id, title, materials }) => {
    const [hidden, setHidden] = useState(true);
    const dispatch = useDispatch();
    const allMaterials = useSelector(selectAll);

    return (
        <div
            className={[styles.wrap].join(' ')}
            onClick={() => {
                setHidden(!hidden);
            }}
        >
            <div className={styles.title}>
                <FontAwesomeIcon icon={warehouseIcon} /> {title}
            </div>
            <div className={styles.addonPart}>
                {materials && (
                    <table className={styles.table}>
                        <tbody>
                            {materials.map(
                                ({ quantity, material: { title, id } }) => (
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
                        option='dangerous'
                        disabled={true}
                        onClick={(e) => {
                            dispatch(deleteItemRequest({ id }));
                            e.stopPropagation();
                        }}
                    >
                        Удалить
                    </Button>
                    <Button
                        onClick={(e) => {
                            dispatch(
                                showModal(
                                    <Form
                                        materials={allMaterials}
                                        warehouseId={id || 0}
                                        type='addMaterials'
                                    />
                                )
                            );
                            e.stopPropagation();
                        }}
                    >
                        Принять <FontAwesomeIcon icon={arrowInIcon} />
                    </Button>
                    <Button
                        onClick={(e) => {
                            dispatch(
                                showModal(
                                    <Form
                                        materials={materials.map(
                                            ({ material }) => material
                                        )}
                                        warehouseId={id || 0}
                                        type='moveMaterials'
                                    />
                                )
                            );
                            e.stopPropagation();
                        }}
                    >
                        Переместить <FontAwesomeIcon icon={arrowOutIcon} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FlowItem;
