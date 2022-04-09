import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'features/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser as employeeIcon,
    faUsers as brigadierIcon,
    faUserGraduate as adminIcon,
    faXmark as disabledIcon,
    faCheck as enabledIcon,
} from '@fortawesome/free-solid-svg-icons';
import Form from './Form';
import { IEmployee } from './types';

import styles from './ListItem.module.scss';

const roleIcons: any = {
    ROLE_ADMIN: adminIcon,
    ROLE_BRIGADIER: brigadierIcon,
    ROLE_EMPLOYEE: employeeIcon,
};

interface Props extends IEmployee {}

const ListItem: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const { fullName, role, enabled } = props;

    return (
        <tr
            className={[styles.wrap, !enabled ? styles.hilight : ''].join(' ')}
            onClick={() => dispatch(showModal(<Form {...props} />))}
        >
            <td className={styles.role}>
                <FontAwesomeIcon icon={roleIcons[role]} />
            </td>
            <td className={styles.enabled}>
                {enabled ? (
                    <FontAwesomeIcon icon={enabledIcon} />
                ) : (
                    <FontAwesomeIcon icon={disabledIcon} />
                )}
            </td>
            <td>{fullName}</td>
        </tr>
    );
};

export default ListItem;
