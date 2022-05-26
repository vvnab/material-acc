import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from 'features/authentication/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import UserFrame from './UserFrame';
import {
    faDashboard as dashboardIcon,
    faAddressBook as directoriesIcon,
    faWarehouse as warehousesIcon,
    faFlag as reportsIcon,
    faGears as settingsIcon,
    faBars as menuIcon,
    faListCheck as tasksIcon,
} from '@fortawesome/free-solid-svg-icons';

import styles from './AsidePanel.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    logout?: () => void;
}

const AsidePanel: React.FC<Props> = ({ logout, ...rest }) => {
    const { username, fullName, role } = useSelector(selectProfile);
    const [menuActive, setMenuActive] = useState(false);
    return (
        <>
            <div className={styles.menu}>
                <h1>ДК Норд</h1>
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
                <div className={styles.buttonGroup}>
                    <Button icon={dashboardIcon} text='Мониторинг' url='/' />
                    <Button icon={tasksIcon} text='Задачи' url='/tasks' />
                    <Button icon={reportsIcon} text='Отчёты' url='/reports' />
                    {role === 'ROLE_ADMIN' && (
                        <>
                            <Button
                                icon={warehousesIcon}
                                text='Материалы'
                                url='/stock'
                            />
                            <Button
                                icon={directoriesIcon}
                                text='Справочники'
                                url='/directories'
                            />
                            <Button
                                icon={settingsIcon}
                                text='Настройки'
                                url='/settings'
                            />
                        </>
                    )}
                </div>
                <UserFrame
                    username={username}
                    fullName={fullName}
                    action={logout}
                />
            </div>
        </>
    );
};

export default AsidePanel;
