import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserTie as userIcon,
    faRightFromBracket as logoutIcon,
} from '@fortawesome/free-solid-svg-icons';

import styles from './UserFrame.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    username: string;
    fullName: string;
    action?: () => never;
}

const UserFrame: React.FC<Props> = ({
    username,
    fullName,
    action,
    ...rest
}) => {
    return (
        <div {...rest} className={styles.wrap}>
            <FontAwesomeIcon icon={userIcon} className={styles.userIcon} />
            <div>{fullName}</div>
            <div>
                {username}{' '}
                <FontAwesomeIcon
                    icon={logoutIcon}
                    onClick={action}
                    className={styles.logoutIcon}
                />
            </div>
        </div>
    );
};

export default UserFrame;
