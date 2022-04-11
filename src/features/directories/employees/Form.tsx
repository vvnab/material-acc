import React from 'react';
import { useFormik } from 'formik';
import { Input, Select, Button } from 'common/components';
import { IEmployee, ROLES } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemRequest, deleteItemRequest } from './actions';
import { selectItemLoading } from './selectors';

import styles from '../Form.module.scss';

interface Props extends IEmployee {}

const Form: React.FC<Props> = ({ ...employee }) => {
    const { id, enabled } = employee;
    const isLoading = useSelector(selectItemLoading);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: { ...employee, password: '' },
        validate: ({ fullName, password, username, role }) => {
            let errors: any = {};

            if (role !== 'ROLE_EMPLOYEE' && !password) {
                errors.password = 'Поле не должно быть пустым';
            }

            if (role !== 'ROLE_EMPLOYEE' && !username) {
                errors.username = 'Поле не должно быть пустым';
            }

            if (!fullName) {
                errors.fullName = 'Поле не должно быть пустым';
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
                <fieldset>
                    <Select
                        name='role'
                        legend='Роль в системе'
                        onChange={formik.handleChange}
                        value={formik.values.role}
                    >
                        {ROLES.map(({ title, value }: any) => (
                            <option key={value} value={value}>
                                {title}
                            </option>
                        ))}
                    </Select>
                    <Input
                        name='fullName'
                        placeholder='Полное имя'
                        legend='Полное имя'
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        error={
                            formik.touched.fullName && formik.errors.fullName
                        }
                    />
                    {formik.values.role !== 'ROLE_EMPLOYEE' && (
                        <Input
                            name='username'
                            placeholder='Имя в системе'
                            legend='Имя в системе'
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            error={
                                formik.touched.username &&
                                formik.errors.username
                            }
                        />
                    )}
                    {formik.values.role !== 'ROLE_EMPLOYEE' && (
                        <Input
                            name='password'
                            placeholder='Задать новый пароль'
                            legend='Пароль'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        />
                    )}
                </fieldset>

                <div className={styles.buttonGroup}>
                    {id && (
                        <Button
                            type='button'
                            option='dangerous'
                            className={styles.button}
                            disabled={isLoading || !enabled}
                            onClick={(e) =>
                                dispatch(deleteItemRequest(employee))
                            }
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
