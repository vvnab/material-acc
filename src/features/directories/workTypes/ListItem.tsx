import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'features/modal';
import Form from './Form';
import { IWorkType } from './types';

import styles from './ListItem.module.scss';

interface Props extends IWorkType {}

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
