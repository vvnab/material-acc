import React from 'react';
import { useFormik } from 'formik';
import { Input, Select, Button } from 'common/components';
import { IBrigade } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemRequest, deleteItemRequest } from './actions';
import { selectItemLoading } from './selectors';
import { selectBrigadiers } from 'features/directories/employees/selectors';
import { selectEmployees } from 'features/directories/employees/selectors';

import styles from './Form.module.scss';

interface Props extends IBrigade {}

const Form: React.FC<Props> = ({ ...item }) => {
    const { id, brigadierId, employees } = item;
    const dispatch = useDispatch();
    const isLoading = useSelector(selectItemLoading);
    const brigadiers = useSelector(selectBrigadiers);
    const allEmployees = useSelector(selectEmployees);

    const formik = useFormik({
        initialValues: {
            ...item,
            brigadierId: brigadierId || brigadiers[0]?.id,
            employees: employees ? employees.map(({ id }) => id.toString()) : [],
        },
        validate: ({ title }) => {
            let errors: any = {};

            if (!title) {
                errors.title = 'Поле не должно быть пустым';
            }
            return errors;
        },
        onSubmit: (values: any) => {
            dispatch(updateItemRequest(values));
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className={styles.wrap}>
                <Input
                    name='title'
                    placeholder='Наименование'
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
                />
                <Select
                    name='brigadierId'
                    placeholder='Бригадир'
                    onChange={formik.handleChange}
                    value={formik.values.brigadierId}
                >
                    {brigadiers.map(({ id, fullName }) => (
                        <option key={id} value={id}>
                            {fullName}
                        </option>
                    ))}
                </Select>
                <Select
                    name='employees'
                    placeholder='Бригадир'
                    onChange={formik.handleChange}
                    value={formik.values.employees}
                    multiple
                >
                    {allEmployees.map(({ id, fullName }: any) => (
                        <option key={id} value={id}>
                            {fullName}
                        </option>
                    ))}
                </Select>
                <div className={styles.buttonGroup}>
                    {id && (
                        <Button
                            type='button'
                            option='dangerous'
                            className={styles.button}
                            disabled={isLoading}
                            onClick={(e) => dispatch(deleteItemRequest(item))}
                        >
                            Удалить
                        </Button>
                    )}
                    <Button className={styles.button} disabled={isLoading}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Form;
