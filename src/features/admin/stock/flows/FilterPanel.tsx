import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from './actions';
import { selectFilter } from './selectors';
import { selectAll as selectWarehouses } from 'features/directories/warehouses/selectors';
import { selectAll as selectBrigades } from 'features/directories/brigades/selectors';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEraser as eraserIcon,
    faWarehouse as warehouseIcon,
    faUserNinja as brigadeIcon,
    faEarth as globeIcon,
    faArrowRightArrowLeft as changeIcon,
    faArrowRightFromBracket as outIcon,
    faArrowRightToBracket as inIcon,
} from '@fortawesome/free-solid-svg-icons';
import { Select, Button, RadioButton, Datetime } from 'common/components';
import { OpsType } from './types';

import styles from './FilterPanel.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const FilterPanel: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);
    const brigades = useSelector(selectBrigades).map((i) => ({
        ...i,
        type: 'brigadeId',
    }));
    const warehouses = useSelector(selectWarehouses).map((i) => ({
        ...i,
        type: 'warehouseId',
    }));

    const warehouseIncome =
        (filter?.opsTypes || []).indexOf('WAREHOUSE_INCOME') >= 0;
    const warehouseToWarehouse =
        (filter?.opsTypes || []).indexOf('WAREHOUSE_TO_WAREHOUSE') >= 0;
    const brigadeToWarehouse =
        (filter?.opsTypes || []).indexOf('BRIGADE_TO_WAREHOUSE') >= 0;
    const warehouseToBrigade =
        (filter?.opsTypes || []).indexOf('WAREHOUSE_TO_BRIGADE') >= 0;
    const brigadeToBrigade =
        (filter?.opsTypes || []).indexOf('BRIGADE_TO_BRIGADE') >= 0;

    const switchOpsType = (type: OpsType) => {
        const opsTypes = new Set(filter?.opsTypes);
        if (opsTypes.has(type)) {
            opsTypes.delete(type);
        } else {
            opsTypes.add(type);
        }
        dispatch(
            updateFilter({
                ...filter,
                opsTypes: Array.from(opsTypes),
            })
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
            <RadioButton
                className={styles.button}
                selected={warehouseIncome}
                onClick={() => switchOpsType('WAREHOUSE_INCOME')}
            >
                <FontAwesomeIcon icon={globeIcon} />
                <FontAwesomeIcon icon={inIcon} />
            </RadioButton>
            <RadioButton
                className={styles.button}
                selected={warehouseToWarehouse}
                onClick={() => switchOpsType('WAREHOUSE_TO_WAREHOUSE')}
            >
                <FontAwesomeIcon icon={warehouseIcon} />
                <FontAwesomeIcon icon={changeIcon} />
            </RadioButton>
            <RadioButton
                className={styles.button}
                selected={brigadeToBrigade}
                onClick={() => switchOpsType('BRIGADE_TO_BRIGADE')}
            >
                <FontAwesomeIcon icon={brigadeIcon} />
                <FontAwesomeIcon icon={changeIcon} />
            </RadioButton>
            <RadioButton
                className={styles.button}
                selected={warehouseToBrigade}
                onClick={() => switchOpsType('WAREHOUSE_TO_BRIGADE')}
            >
                <FontAwesomeIcon icon={brigadeIcon} />
                <FontAwesomeIcon icon={inIcon} />
            </RadioButton>
            <RadioButton
                className={styles.button}
                selected={brigadeToWarehouse}
                onClick={() => switchOpsType('BRIGADE_TO_WAREHOUSE')}
            >
                <FontAwesomeIcon icon={brigadeIcon} />
                <FontAwesomeIcon icon={outIcon} />
            </RadioButton>
            <Select
                legend='Склад/бригада'
                className={styles.select}
                value={`${filter?.brigadeId ? 'brigadeId' : 'warehouseId'}_${
                    filter?.brigadeId || filter?.warehouseId
                }`}
                onChange={(e) => {
                    const [type, id] = e.currentTarget.value.split('_');
                    dispatch(
                        updateFilter({
                            opsTypes: filter?.opsTypes || [],
                            dateRange: filter?.dateRange || {},
                            [type]: id,
                        })
                    );
                }}
            >
                <option key={0} value={0}>
                    ------
                </option>
                {[...warehouses, ...brigades].map((i, key) => (
                    <option key={key} value={`${i.type}_${i.id}`}>
                        {i.title}
                    </option>
                ))}
            </Select>
            <Button
                className={styles.find}
                option='dangerous'
                onClick={() => dispatch(updateFilter({}))}
            >
                <FontAwesomeIcon icon={eraserIcon} />
            </Button>
            {/* <Button className={styles.find}>Применить</Button> */}
        </div>
    );
};

export default FilterPanel;
