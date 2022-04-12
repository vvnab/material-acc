import React from 'react';
import { useFormik } from 'formik';
import { Select, Button } from 'common/components';
import { IBrigade } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemRequest, deleteItemRequest } from './actions';
import { selectItemLoading } from './selectors';
import { selectBrigadiers } from 'features/directories/employees/selectors';
import { selectEmployees } from 'features/directories/employees/selectors';

import styles from '../Form.module.scss';

interface Props extends IBrigade {}

const Form: React.FC<Props> = ({ ...item }) => {
    const { id, brigadier, employees } = item;
    const dispatch = useDispatch();
    const isLoading = useSelector(selectItemLoading);
    const brigadiers = useSelector(selectBrigadiers(id));
    const allEmployees = useSelector(selectEmployees(id));

    const formik = useFormik({
        initialValues: {
            ...item,
            brigadierId: brigadier?.id || brigadiers[0]?.id,
            employees: employees
                ? employees.map(({ id }) => id.toString())
                : [],
        },
        validate: ({ brigadierId }) => {
            let errors: any = {};

            if (!brigadierId) {
                errors.brigadierId = 'Поле не должно быть пустым';
            }
            return errors;
        },
        onSubmit: (values: any) => {
            const currentBrigadier = brigadiers.find(
                ({ id }) => id?.toString() === values.brigadierId.toString()
            );
            dispatch(
                updateItemRequest({
                    ...values,
                    title: currentBrigadier?.fullName,
                })
            );
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className={styles.wrap}>
                <fieldset>
                    {/* <Input
                        name='title'
                        placeholder='Наименование'
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={formik.errors.title}
                    /> */}
                    <Select
                        name='brigadierId'
                        placeholder='Бригадир'
                        legend='Бригадир'
                        onChange={formik.handleChange}
                        value={formik.values.brigadierId}
                        error={formik.errors.brigadierId}
                    >
                        {brigadiers.map(({ id, fullName }) => (
                            <option key={id} value={id}>
                                {fullName}
                            </option>
                        ))}
                    </Select>
                    <Select
                        name='employees'
                        legend='Члены бригады'
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
                </fieldset>

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
