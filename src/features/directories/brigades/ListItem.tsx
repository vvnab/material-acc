import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'features/modal';
import Form from './Form';
import { IBrigade } from './types';

import styles from './ListItem.module.scss';

interface Props extends IBrigade {}

const ListItem: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const { title, brigadier } = props;

    return (
        <tr
            className={[styles.wrap].join(' ')}
            onClick={() => dispatch(showModal(<Form {...props} />))}
        >
            <td>{title}</td>
            <td>{brigadier?.fullName}</td>
        </tr>
    );
};

export default ListItem;
