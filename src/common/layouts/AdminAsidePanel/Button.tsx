import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck as checkIcon } from '@fortawesome/free-solid-svg-icons';

import styles from './Button.module.scss';

interface Props {
    icon: any;
    text: string;
    url: string;
}

const Button: React.FC<Props> = ({ icon, text, url }) => {
    const { pathname } = useLocation();
    return (
        <Link to={url} className={styles.wrap}>
            {pathname.split('/')[1] === url.replace(/\//, '') && <Check />}
            <FontAwesomeIcon icon={icon} className={styles.icon} />
            {text}
        </Link>
    );
};

const Check: React.FC = () => {
    return <FontAwesomeIcon icon={checkIcon} className={styles.iconCheck} />;
};

export default Button;
