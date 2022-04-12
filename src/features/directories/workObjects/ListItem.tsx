import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'features/modal';
import Form from './Form';
import { IWorkObjects } from './types';

import styles from './ListItem.module.scss';

interface Props extends IWorkObjects {}

const ListItem: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const { region, road, contract } = props;

    return (
        <tr
            className={[styles.wrap].join(' ')}
            onClick={() => dispatch(showModal(<Form {...props} />))}
        >
            <td>{region}</td>
            <td>{road}</td>
            <td>{contract}</td>
        </tr>
    );
};

export default ListItem;
