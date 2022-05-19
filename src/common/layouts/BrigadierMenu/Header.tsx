import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectProfile } from 'features/authentication/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDashboard as dashboardIcon,
    faWarehouse as warehousesIcon,
    faSignOut as logoutIcon,
    faFlag as reportsIcon,
    faGears as settingsIcon,
    faBars as menuIcon,
    faListCheck as tasksIcon,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    logout?: () => void;
}

const Header: React.FC<Props> = ({ logout, ...rest }) => {
    const { fullName } = useSelector(selectProfile);
    const [menuActive, setMenuActive] = useState(false);
    return (
        <>
            <div className={styles.menu}>
                <h3>{fullName}</h3>
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
            >
                <menu>
                    <li>
                        <Link to='/'>
                            <FontAwesomeIcon
                                icon={dashboardIcon}
                                className={styles.menuIcon}
                            />
                            Главная
                        </Link>
                    </li>
                    <li>
                        <Link to='/tasks'>
                            <FontAwesomeIcon
                                icon={tasksIcon}
                                className={styles.menuIcon}
                            />
                            Задачи
                        </Link>
                    </li>
                    <li>
                        <Link to='/reports'>
                            <FontAwesomeIcon
                                icon={reportsIcon}
                                className={styles.menuIcon}
                            />
                            Отчёты
                        </Link>
                    </li>
                    <li>
                        <Link to='/warehouse'>
                            <FontAwesomeIcon
                                icon={warehousesIcon}
                                className={styles.menuIcon}
                            />
                            Материалы
                        </Link>
                    </li>
                    <li>
                        <FontAwesomeIcon
                            icon={settingsIcon}
                            className={styles.menuIcon}
                        />
                        Настройки
                    </li>
                    <li></li>
                    <li onClick={logout}>
                        <FontAwesomeIcon
                            icon={logoutIcon}
                            className={styles.menuIcon}
                        />
                        Выйти
                    </li>
                </menu>
            </div>
        </>
    );
};

export default Header;
