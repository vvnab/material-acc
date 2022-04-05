import React from 'react';
import Controls from './Controls';
import List from './List';

import styles from './Panel.module.scss';

interface Props extends React.HTMLProps<HTMLFieldSetElement> {
    legend?: string;
    items: [any];
}

const Panel: React.FC<Props> = ({ legend, items, ...rest }) => {
    return (
        <fieldset {...rest} className={styles.wrap}>
            {legend && <legend>{legend}</legend>}
            <Controls />
            <List items={items} />
        </fieldset>
    );
};

export default Panel;
