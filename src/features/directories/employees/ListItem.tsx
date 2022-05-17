import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'features/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserNinja as brigadierIcon,
    faUserTie as adminIcon,
    faHeadSideCough as dispatherIcon,
    // faXmark as disabledIcon,
    // faCheck as enabledIcon,
} from '@fortawesome/free-solid-svg-icons';
import { faUser as employeeIcon } from '@fortawesome/free-regular-svg-icons';
import Form from './Form';
import { IEmployee, ROLES } from './types';

import styles from './ListItem.module.scss';

const roleIcons: any = {
    ROLE_ADMIN: adminIcon,
    ROLE_BRIGADIER: brigadierIcon,
    ROLE_EMPLOYEE: employeeIcon,
    ROLE_DISPATCHER: dispatherIcon,
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
            {/* <td className={styles.enabled}>
                {enabled ? (
                    <FontAwesomeIcon icon={enabledIcon} />
                ) : (
                    <FontAwesomeIcon icon={disabledIcon} />
                )}
            </td> */}
            <td>{fullName}</td>
            <td>{ROLES.find((i: any) => i.value === role).title}</td>
        </tr>
    );
};

export default ListItem;
