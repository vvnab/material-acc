import React from 'react';
import Button from './Button';
import UserFrame from './UserFrame';
import {
    faDashboard as dashboardIcon,
    faAddressBook as directoriesIcon,
    faFlag as reportsIcon,
    faGears as settingsIcon,
} from '@fortawesome/free-solid-svg-icons';

import styles from './AsidePanel.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    logout?: () => void;
}

const AsidePanel: React.FC<Props> = ({ logout, ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            <div className={styles.buttonGroup}>
                <Button icon={dashboardIcon} text='Мониторинг' url='/' />
                <Button
                    icon={directoriesIcon}
                    text='Справочники'
                    url='/directories'
                />
                <Button icon={reportsIcon} text='Отчёты' url='/reports' />
                <Button icon={settingsIcon} text='Настройки' url='/settings' />
            </div>
            <UserFrame
                username='vvnab'
                fullName='Виталий Набережный'
                action={logout}
            />
        </div>
    );
};

export default AsidePanel;
