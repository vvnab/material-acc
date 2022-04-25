import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from './actions';
import { selectFilter } from './selectors';
// import { selectAll as selectWarehouses } from 'features/directories/warehouses/selectors';
// import { selectAll as selectBrigades } from 'features/directories/brigades/selectors';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEraser as eraserIcon,
    // faWarehouse as warehouseIcon,
    // faUserNinja as brigadeIcon,
    // faEarth as globeIcon,
    // faArrowRightArrowLeft as changeIcon,
    // faArrowRightFromBracket as outIcon,
    // faArrowRightToBracket as inIcon,
    // faPersonDigging as workIcon,
} from '@fortawesome/free-solid-svg-icons';
import {  Button,  Datetime } from 'common/components';

import styles from './FilterPanel.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const FilterPanel: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);
    // const brigades = useSelector(selectBrigades).map((i) => ({
    //     ...i,
    //     type: 'brigadeId',
    // }));
    // const warehouses = useSelector(selectWarehouses).map((i) => ({
    //     ...i,
    //     type: 'warehouseId',
    // }));

    const filterIsEmpty = () => {
        return (
            filter?.brigadeId ||
            filter?.dateRange?.from ||
            filter?.dateRange?.to
        );
    };

    return (
        <div {...rest} className={styles.wrap}>
            <Datetime
                legend='Начало'
                className={styles.date}
                date={filter?.dateRange?.from}
                onChange={(e) =>
                    dispatch(
                        updateFilter({
                            ...filter,
                            dateRange: {
                                ...filter?.dateRange,
                                from: e.currentTarget.value,
                            },
                        })
                    )
                }
            />
            <Datetime
                legend='Окончание'
                className={styles.date}
                date={filter?.dateRange?.to}
                onChange={(e) =>
                    dispatch(
                        updateFilter({
                            ...filter,
                            dateRange: {
                                ...filter?.dateRange,
                                to: e.currentTarget.value,
                            },
                        })
                    )
                }
            />
            <Button
                className={styles.find}
                option={
                    filterIsEmpty() ? 'dangerous' : 'default'
                }
                onClick={() => dispatch(updateFilter({}))}
            >
                <FontAwesomeIcon icon={eraserIcon} />
            </Button>
        </div>
    );
};

export default FilterPanel;
