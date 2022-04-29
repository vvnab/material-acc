import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'features/reports/actions';
import { selectFilter } from 'features/reports/selectors';
import { selectAll as selectBrigades } from 'features/directories/brigades/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEraser as eraserIcon,
    faPenToSquare as createdIcon,
    faBan as rejectedIcon,
    faEye as publishedIcon,
    faCircleCheck as acceptedIcon,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Datetime, Select, RadioButton } from 'common/components';
import { IStatus } from 'features/reports/types';

import styles from './FilterPanel.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const FilterPanel: React.FC<Props> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);
    const brigades = useSelector(selectBrigades);

    const filterIsEmpty = () => {
        return (
            filter?.brigadeId ||
            filter?.dateRange?.from ||
            filter?.dateRange?.to ||
            filter?.statuses?.length
        );
    };

    const created = (filter.statuses || []).indexOf('CREATED') >= 0;
    const published = (filter.statuses || []).indexOf('PUBLISHED') >= 0;
    const accepted = (filter.statuses || []).indexOf('ACCEPTED') >= 0;
    const rejected = (filter.statuses || []).indexOf('REJECTED') >= 0;

    const switchState = (type: IStatus) => {
        const statuses = new Set(filter?.statuses);
        if (statuses.has(type)) {
            statuses.delete(type);
        } else {
            statuses.add(type);
        }
        dispatch(
            updateFilter({
                ...filter,
                statuses: Array.from(statuses),
            })
        );
    };

    return (
        <div {...rest} className={styles.wrap}>
            <Datetime
                legend='Начало'
                className={styles.date}
                value={filter?.dateRange?.from}
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
                value={filter?.dateRange?.to}
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
                className={[styles.button, styles.created].join(' ')}
                selected={created}
                onClick={() => switchState('CREATED')}
            >
                <FontAwesomeIcon icon={createdIcon} />
            </RadioButton>
            <RadioButton
                className={[styles.button, styles.published].join(' ')}
                selected={published}
                onClick={() => switchState('PUBLISHED')}
            >
                <FontAwesomeIcon icon={publishedIcon} />
            </RadioButton>
            <RadioButton
                className={[styles.button, styles.accepted].join(' ')}
                selected={accepted}
                onClick={() => switchState('ACCEPTED')}
            >
                <FontAwesomeIcon icon={acceptedIcon} />
            </RadioButton>
            <RadioButton
                className={[styles.button, styles.rejected].join(' ')}
                selected={rejected}
                onClick={() => switchState('REJECTED')}
            >
                <FontAwesomeIcon icon={rejectedIcon} />
            </RadioButton>

            <Select
                legend='Бригада'
                className={styles.select}
                value={filter?.brigadeId || 0}
                onChange={(e) => {
                    const id = e.currentTarget.value;
                    dispatch(
                        updateFilter({
                            statuses: filter?.statuses || [],
                            dateRange: filter?.dateRange || {},
                            brigadeId: id,
                        })
                    );
                }}
            >
                <option value={0}>
                    ------
                </option>
                {brigades.map((i, key) => (
                    <option key={key} value={i.id}>
                        {i.title}
                    </option>
                ))}
            </Select>

            <Button
                className={styles.find}
                option={filterIsEmpty() ? 'dangerous' : 'default'}
                onClick={() => dispatch(updateFilter({}))}
            >
                <FontAwesomeIcon icon={eraserIcon} />
            </Button>
        </div>
    );
};

export default FilterPanel;
