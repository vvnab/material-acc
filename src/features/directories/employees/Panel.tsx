import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectList,
    isLoading,
    selectErrorMessage,
} from './selectors';
import { Loader } from 'common/components';
import Controls from '../Controls';
import List from '../List';

import styles from './Panel.module.scss';

interface Props extends React.HTMLProps<HTMLFieldSetElement> {
    legend?: string;
    getTitle: any;
}

const Panel: React.FC<Props> = ({ legend, getTitle, ...rest }) => {
    const list = useSelector(selectList);
    const error = useSelector(selectErrorMessage);
    const loading = useSelector(isLoading);

    return (
        <fieldset {...rest} className={styles.wrap}>
            {legend && <legend>{legend}</legend>}
            <Controls />
            {loading ? (
                <Loader />
            ) : !error ? (
                <List
                    items={list.map((i: any) => ({
                        id: i.id,
                        title: getTitle(i),
                    }))}
                />
            ) : (
                <div className={styles.error}>{error}</div>
            )}
        </fieldset>
    );
};

export default Panel;
