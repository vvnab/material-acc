import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'features/modal';
import Form from './Form';
import { IRoadSign } from './types';

import styles from './ListItem.module.scss';

interface Props extends IRoadSign {}

const ListItem: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const { title } = props;

    return (
        <tr
            className={[styles.wrap].join(' ')}
            onClick={() => dispatch(showModal(<Form {...props} />))}
        >
            <td>{title}</td>
        </tr>
    );
};

export default ListItem;
