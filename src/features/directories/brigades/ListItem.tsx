import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNinja as brigadierIcon } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { showModal } from 'features/modal';
import Form from './Form';
import { IBrigade } from './types';

import styles from './ListItem.module.scss';

interface Props extends IBrigade {}

const ListItem: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const { title, brigadier, employees } = props;

    return (
        <tr
            className={[styles.wrap].join(' ')}
            onClick={() => dispatch(showModal(<Form {...props} />))}
        >
            <td>{title}</td>
            <td className={styles.employees}>{employees?.length || 0} чел.</td>
            <td>
                <FontAwesomeIcon icon={brigadierIcon} />{' '}
                {brigadier?.fullName}
            </td>
        </tr>
    );
};

export default ListItem;
