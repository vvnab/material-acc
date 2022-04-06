import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner as loaderIcon } from '@fortawesome/free-solid-svg-icons';

import styles from './Loader.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Loader: React.FC<Props> = ({ className }) => {
    return (
        <div className={[styles.wrap, className].join(' ')}>
            <FontAwesomeIcon icon={loaderIcon} className={styles.iconLoader} />
        </div>
    );
};

export default Loader;
