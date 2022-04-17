import React from 'react';
// import { useDispatch } from 'react-redux';
// import { loadRequest } from './actions';
import { Input, Button } from 'common/components';

import styles from './FilterPanel.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const FilterPanel: React.FC<Props> = ({ children, ...rest }) => {
    // const dispatch = useDispatch();

    return (
        <div {...rest} className={styles.wrap}>
            <Input placeholder='Период' />
            <Input placeholder='Состояние' />
            <Input placeholder='Тип' />
            <Button className={styles.find}>Применить</Button>
        </div>
    );
};

export default FilterPanel;
