import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'features/tasks/actions';
import { selectFilter } from 'features/tasks/selectors';
import { selectAll as selectBrigades } from 'features/directories/brigades/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEraser as eraserIcon,
    faPenToSquare as createdIcon,
    faPlay as startedIcon,
    faCircleCheck as doneIcon,
    faPlus as addIcon,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Datetime, Select, RadioButton } from 'common/components';
import { showModal, Modal } from 'features/modal';
import { IStatus } from 'features/tasks/types';
import TaskForm from './TaskForm'

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
    const started = (filter.statuses || []).indexOf('STARTED') >= 0;
    const done = (filter.statuses || []).indexOf('DONE') >= 0;

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
        <>
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

                <RadioButton
                    className={[styles.button, styles.created].join(' ')}
                    selected={created}
                    onClick={() => switchState('CREATED')}
                >
                    <FontAwesomeIcon icon={createdIcon} />
                </RadioButton>
                <RadioButton
                    className={[styles.button, styles.published].join(' ')}
                    selected={started}
                    onClick={() => switchState('STARTED')}
                >
                    <FontAwesomeIcon icon={startedIcon} />
                </RadioButton>
                <RadioButton
                    className={[styles.button, styles.accepted].join(' ')}
                    selected={done}
                    onClick={() => switchState('DONE')}
                >
                    <FontAwesomeIcon icon={doneIcon} />
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
                    <option value={0}>------</option>
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

                <Button
                    className={[styles.find].join(' ')}
                    onClick={() => dispatch(showModal(<TaskForm title='' description=''/>))}
                >
                    <FontAwesomeIcon icon={addIcon} />
                </Button>
            </div>
            <Modal />
        </>
    );
};

export default FilterPanel;
