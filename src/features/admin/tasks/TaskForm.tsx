import React from 'react';
import { useFormik } from 'formik';
import { Input, Select, TextArea, Button } from 'common/components';
import { ITask } from 'features/tasks/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemRequest, deleteItemRequest } from 'features/tasks/actions';
import { selectItemLoading } from 'features/tasks/selectors';
import { selectAll as selectBrigades } from 'features/directories/brigades/selectors';

import styles from './Form.module.scss';

interface Props extends ITask {}

const TaksForm: React.FC<Props> = ({ ...item }) => {
    const { id } = item;
    const isLoading = useSelector(selectItemLoading);
    const brigades = useSelector(selectBrigades);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: { ...item },
        validate: ({ title }) => {
            let errors: any = {};

            if (!title) {
                errors.comment = 'Поле не должно быть пустым';
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
                <fieldset className={styles.inputGroup}>
                    <Select
                        name='brigadeId'
                        placeholder='Бригада'
                        legend='Бригада'
                        onChange={formik.handleChange}
                        value={formik.values.brigadeId}
                        error={formik.errors.brigadeId}
                    >
                        {brigades.map(({ id, title }) => (
                            <option key={id} value={id}>
                                {title}
                            </option>
                        ))}
                    </Select>
                    <Input
                        name='title'
                        placeholder='Наименование'
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={formik.errors.title}
                    />
                    <TextArea
                        name='description'
                        rows={6}
                        placeholder='Описание'
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        error={formik.errors.description}
                    />
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

export default TaksForm;
