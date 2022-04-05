import React from 'react';
import { Button, Input } from 'common/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus as addIcon,
    faEraser as eraseIcon,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Controls.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Controls: React.FC<Props> = ({ ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            <div className={styles.inputWrap}>
                <Input
                    placeholder='Строка для поиска'
                    className={styles.input}
                />
                <FontAwesomeIcon
                    icon={eraseIcon}
                    className={styles.eraseIcon}
                />
            </div>
            <Button className={styles.addButton}>
                <FontAwesomeIcon icon={addIcon} className={styles.addIcon}/>
            </Button>
        </div>
    );
};

export default Controls;
