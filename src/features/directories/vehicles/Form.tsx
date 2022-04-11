import React from 'react';
import { useFormik } from 'formik';
import { Input, Select, Button } from 'common/components';
import { IVehicle } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemRequest, deleteItemRequest } from './actions';
import { selectItemLoading } from './selectors';
import { selectList as selectWorkTypes } from 'features/directories/workTypes/selectors';

import styles from '../Form.module.scss';

interface Props extends IVehicle {}

const Form: React.FC<Props> = ({ ...item }) => {
    const { id, workTypes } = item;
    const dispatch = useDispatch();
    const isLoading = useSelector(selectItemLoading);
    const allWorktypes = useSelector(selectWorkTypes);

    const formik = useFormik({
        initialValues: {
            ...item,
            workTypes: workTypes
                ? workTypes.map(({ id }) => id.toString())
                : [],
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
                <fieldset>
                    <Input
                        name='title'
                        placeholder='Наименование'
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={formik.errors.title}
                    />
                    <Select
                        name='workTypes'
                        legend='Типы работ'
                        onChange={formik.handleChange}
                        value={formik.values.workTypes}
                        multiple
                    >
                        {allWorktypes.map(({ id, title }: any) => (
                            <option key={id} value={id}>
                                {title}
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
