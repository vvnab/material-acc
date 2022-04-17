import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Tabs.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    items: {
        title: string;
        url: string;
    }[];
}

const Tabs: React.FC<Props> = ({ items, ...rest }) => {
    const { pathname } = useLocation();

    return (
        <div {...rest} className={styles.wrap}>
            {items.map(({ title, url }) => {
                return (
                    <Link
                        to={url}
                        key={url}
                        className={[
                            styles.tab,
                            pathname === url ? styles.active : '',
                        ].join(' ')}
                    >
                        {title}
                    </Link>
                );
            })}
        </div>
    );
};

export default Tabs;
