import React from 'react';
import styles from './List.module.scss';

interface Props extends React.HTMLProps<HTMLUListElement> {
    items: [any];
}

const List: React.FC<Props> = ({ items, ...rest }) => {
    return (
        <ul {...rest} className={styles.wrap}>
            {items.map(({ id, title }) => (
                <li key={id}>{title}</li>
            ))}
        </ul>
    );
};

export default List;
