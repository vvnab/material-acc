import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft as arrowInIcon,
    faArrowRight as arrowOutIcon,
    faReply as arrowMoveIcon,
    faUserNinja as warehouseIcon,
} from '@fortawesome/free-solid-svg-icons';
import { showModal } from 'features/modal';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import moment from 'moment';
import 'moment/locale/ru';
import { Button } from 'common/components';
import { selectAll } from 'features/directories/materials/selectors';

import styles from './Item.module.scss';
import { IBrigade } from 'features/directories/brigades/types';

moment.locale('ru');

const FlowItem: React.FC<IBrigade> = ({ id, title, materials }) => {
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
                        onClick={(e) => {
                            dispatch(
                                showModal(
                                    <Form
                                        materials={allMaterials}
                                        brigadeId={id || 0}
                                        type='requestMaterials'
                                    />
                                )
                            );
                            e.stopPropagation();
                        }}
                    >
                        Запросить <FontAwesomeIcon icon={arrowInIcon} />
                    </Button>
                    <Button
                        onClick={(e) => {
                            dispatch(
                                showModal(
                                    <Form
                                        materials={materials.map(
                                            ({ material }) => material
                                        )}
                                        brigadeId={id || 0}
                                        type='sendToBrigade'
                                    />
                                )
                            );
                            e.stopPropagation();
                        }}
                    >
                        Переместить <FontAwesomeIcon icon={arrowOutIcon} />
                    </Button>
                    <Button
                        onClick={(e) => {
                            dispatch(
                                showModal(
                                    <Form
                                        materials={materials.map(
                                            ({ material }) => material
                                        )}
                                        brigadeId={id || 0}
                                        type='sendToWarehouse'
                                    />
                                )
                            );
                            e.stopPropagation();
                        }}
                    >
                        Вернуть <FontAwesomeIcon icon={arrowMoveIcon} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FlowItem;
