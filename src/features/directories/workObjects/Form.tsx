import React from 'react';
import { useFormik } from 'formik';
import { TextArea, Button } from 'common/components';
import { IWorkObjects } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemRequest, deleteItemRequest } from './actions';
import { selectItemLoading } from './selectors';

import styles from '../Form.module.scss';

interface Props extends IWorkObjects {}

const Form: React.FC<Props> = ({ ...item }) => {
    const { id } = item;
    const isLoading = useSelector(selectItemLoading);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: { ...item },
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
                    <TextArea
                        name='title'
                        rows={6}
                        placeholder='Наименование'
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={formik.errors.title}
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

export default Form;
