import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectProfile } from 'features/authentication/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    // faDashboard as dashboardIcon,
    // faAddressBook as directoriesIcon,
    // faWarehouse as warehousesIcon,
    // faFlag as reportsIcon,
    // faGears as settingsIcon,
    faBars as menuIcon,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    logout?: () => void;
}

const Header: React.FC<Props> = ({ logout, ...rest }) => {
    // const { username, fullName } = useSelector(selectProfile);
    const [menuActive, setMenuActive] = useState(false);
    return (
        <>
            <div className={styles.menu}>
                <h1 onClick={logout}>ДК Норд</h1>
                <FontAwesomeIcon
                    icon={menuIcon}
                    className={styles.menuIcon}
                    onClick={() => setMenuActive(!menuActive)}
                    
                />
            </div>
            <div
                {...rest}
                className={[
                    styles.wrap,
                    menuActive ? styles.menuActive : '',
                ].join(' ')}
                onClick={() => setMenuActive(false)}
            ></div>
        </>
    );
};

export default Header;
