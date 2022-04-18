import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightLong as arrowIcon,
    faWarehouse as warehouseIcon,
    faUserNinja as brigadeIcon,
    faGlobe as globalIcon,
    faPersonDigging as workIcon,
    faCircleChevronDown as iconDown,
    faCircleChevronUp as iconUp,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { updateItemRequest } from './actions';

import moment from 'moment';
import 'moment/locale/ru';
import { IFlow } from './types';
import { Button } from 'common/components';

import styles from './Item.module.scss';

moment.locale('ru');

const FlowItem: React.FC<IFlow> = ({
    id,
    opsType,
    opsStatus,
    fromWarehouse,
    toWarehouse,
    fromBrigade,
    toBrigade,
    createdAt,
    updatedAt,
    materials,
    employeeCreated,
    employeeUpdated,
}) => {
    const [hidden, setHidden] = useState(true);
    const dispatch = useDispatch();
    const outcome = fromBrigade?.title
        ? { icon: brigadeIcon, title: fromBrigade.title }
        : fromWarehouse?.title
        ? { icon: warehouseIcon, title: fromWarehouse.title }
        : { icon: globalIcon, title: '' };

    const income = toBrigade?.title
        ? { icon: brigadeIcon, title: toBrigade.title }
        : toWarehouse?.title
        ? { icon: warehouseIcon, title: toWarehouse.title }
        : { icon: workIcon, title: 'Израсходовано' };
    const status =
        opsStatus === 'CREATED'
            ? styles.created
            : opsStatus === 'ACCEPTED'
            ? styles.accepted
            : styles.rejected;
    return (
        <div
            className={[styles.wrap, status].join(' ')}
            onClick={() => {
                setHidden(!hidden);
            }}
        >
            <div className={styles.down}>
                <FontAwesomeIcon icon={hidden ? iconDown : iconUp} />
            </div>
            <div className={styles.direction}>
                {outcome.title}
                <FontAwesomeIcon
                    icon={outcome.icon}
                    className={styles.arrowIcon}
                />
                <FontAwesomeIcon
                    icon={arrowIcon}
                    className={styles.arrowIcon}
                />
                <FontAwesomeIcon
                    icon={income.icon}
                    className={styles.arrowIcon}
                />
                {income.title}
            </div>
            <div className={styles.datetime}>
                Создано: {moment(createdAt).format('D MMMM YYYY в HH:mm')} -{' '}
                {employeeCreated?.fullName}
            </div>
            <div
                className={[styles.addonPart, hidden ? styles.hidden : ''].join(
                    ' '
                )}
            >
                <table className={styles.table}>
                    <tbody>
                        {materials.map(({ quantity, material: { title } }) => (
                            <tr key={`${title}x${quantity}`}>
                                <td>{title}</td>
                                <td>{quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {opsStatus === 'CREATED' ? (
                    <div className={styles.buttonGroup}>
                        <Button
                            option='dangerous'
                            onClick={(e) => {
                                dispatch(
                                    updateItemRequest({
                                        id: id,
                                        type: 'reject',
                                    })
                                );
                                e.stopPropagation();
                            }}
                        >
                            Отменить
                        </Button>
                        <Button
                            onClick={(e) => {
                                dispatch(
                                    updateItemRequest({
                                        id: id,
                                        type: 'accept',
                                    })
                                );
                                e.stopPropagation();
                            }}
                        >
                            Подтвердить
                        </Button>
                    </div>
                ) : (
                    <div className={styles.datetime}>
                        Подтверждено:{' '}
                        {moment(updatedAt).format('D MMMM YYYY в HH:mm')} -{' '}
                        {employeeUpdated?.fullName}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlowItem;
