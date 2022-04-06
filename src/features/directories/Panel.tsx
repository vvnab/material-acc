import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'common/components';
import Controls from './Controls';
import List from './List';

import styles from './Panel.module.scss';

interface Props extends React.HTMLProps<HTMLFieldSetElement> {
    legend?: string;
    getTitle: any;
    selectList: any;
    selectErrorMessage: any;
    isLoading: any;
}

const Panel: React.FC<Props> = ({
    legend,
    selectList,
    selectErrorMessage,
    isLoading,
    getTitle,
    ...rest
}) => {
    const list: any = useSelector(selectList);
    const error: string = useSelector(selectErrorMessage);
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
