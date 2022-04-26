import React from 'react';
import { useFormik } from 'formik';
import { Input, TextArea, Button } from 'common/components';
import { IWorkObject } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemRequest, deleteItemRequest } from './actions';
import { selectItemLoading, selectRegions, selectRoads } from './selectors';

import styles from '../Form.module.scss';

interface Props extends IWorkObject {}

const Form: React.FC<Props> = ({ ...item }) => {
    const { id } = item;
    const isLoading = useSelector(selectItemLoading);
    const regions= useSelector(selectRegions);
    const roads= useSelector(selectRoads);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: { ...item },
        validate: ({ region, road, contract }) => {
            let errors: any = {};

            if (!region) {
                errors.region = 'Поле не должно быть пустым';
            }
            if (!road) {
                errors.road = 'Поле не должно быть пустым';
            }
            if (!contract) {
                errors.contract = 'Поле не должно быть пустым';
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
                    {/* <Input
                        name='title'
                        placeholder='Наименование'
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={formik.errors.title}
                    /> */}
                    <Input
                        name='region'
                        placeholder='Регион'
                        legend='Регион'
                        onChange={formik.handleChange}
                        dataList={regions}
                        value={formik.values.region}
                        error={formik.errors.region}
                    />
                    <Input
                        name='road'
                        placeholder='Дорога'
                        legend='Дорога'
                        onChange={formik.handleChange}
                        dataList={roads}
                        value={formik.values.road}
                        error={formik.errors.road}
                    />
                    <Input
                        name='contract'
                        placeholder='№ контракта'
                        legend='№ контракта'
                        onChange={formik.handleChange}
                        value={formik.values.contract}
                        error={formik.errors.contract}
                    />
                    <TextArea
                        name='remarks'
                        rows={6}
                        placeholder='Примечания'
                        legend='Примечания'
                        onChange={formik.handleChange}
                        value={formik.values.remarks}
                        error={formik.errors.remarks}
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
