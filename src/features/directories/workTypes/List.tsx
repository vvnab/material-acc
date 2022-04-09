import React from 'react';
import { useSelector } from 'react-redux';
import { selectList } from './selectors';
import ListItem from './ListItem';

import styles from './List.module.scss';

interface Props extends React.HTMLProps<HTMLTableElement> {}

const List: React.FC<Props> = ({ ...rest }) => {
    const items = useSelector(selectList);
    return (
        <div className={styles.wrap}>
            <table {...rest}>
                <tbody>
                    {items.map((item) => (
                        <ListItem key={item.id} {...item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
