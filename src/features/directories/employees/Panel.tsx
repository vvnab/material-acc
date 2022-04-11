import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoading, selectError } from './selectors';
import { Loader } from 'common/components';
import Controls from './Controls';
import List from './List';

import styles from '../Panel.module.scss';

interface Props extends React.HTMLProps<HTMLFieldSetElement> {
    legend?: string;
}

const Panel: React.FC<Props> = ({ legend, ...rest }) => {
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    return (
        <>
            <fieldset {...rest} className={styles.wrap}>
                {legend && <legend>{legend}</legend>}
                <Controls />
                {loading ? (
                    <Loader />
                ) : !error ? (
                    <List />
                ) : (
                    <div className={styles.error}>{error}</div>
                )}
            </fieldset>
        </>
    );
};

export default Panel;
