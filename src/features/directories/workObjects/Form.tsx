import React, { useEffect, useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { Input, TextArea, Button, Select } from 'common/components';
import { IWorkObject } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateItemRequest,
    deleteItemRequest,
    loadItemRequest,
} from './actions';
import {
    selectItem,
    selectItemLoading,
    selectRegions,
    selectRoads,
} from './selectors';

import { selectList as selectMaterials } from 'features/directories/materials/selectors';
import { selectList as selectWorkTypes } from 'features/directories/workTypes/selectors';

import styles from '../Form.module.scss';

const BLANK_TITLE = '-----';

interface Props extends IWorkObject {}

const Form: React.FC<Props> = ({ ...item }) => {
    const { id } = item;
    item = useSelector(selectItem(id)) as IWorkObject;
    const isLoading = useSelector(selectItemLoading);
    const regions = useSelector(selectRegions);
    const roads = useSelector(selectRoads);
    const materials = useSelector(selectMaterials);
    const workTypes = useSelector(selectWorkTypes);
    const dispatch = useDispatch();

    const [plannedMaterials, setPlannedMaterials] = useState(
        item?.plannedMaterials
    );
    const [plannedWorks, setPlannedWorks] = useState(item?.plannedWorks);

    const getAvailableMaterials = useCallback(
        (key: number) => {
            return materials.filter(
                ({ id }) =>
                    !plannedMaterials?.find(
                        (i) => i.material.id === id && i.material.id !== key
                    )
            );
        },
        [materials, plannedMaterials]
    );

    const getAvailableWorkTypes = useCallback(
        (key: number) => {
            return workTypes.filter(
                ({ id }) =>
                    !plannedWorks?.find(
                        (i) => i.workType.id === id && i.workType.id !== key
                    )
            );
        },
        [workTypes, plannedWorks]
    );
    useEffect(() => {
        id && dispatch(loadItemRequest({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        setPlannedMaterials(item?.plannedMaterials);
        setPlannedWorks(item?.plannedWorks);
    }, [item]);

    useEffect(() => {
        const blankLines = (
            plannedMaterials?.filter(({ material: { id } }) => id === 0) || []
        ).length;
        const available = !!getAvailableMaterials(0).length;

        if (blankLines === 0 && available) {
            setPlannedMaterials([
                ...(plannedMaterials || []),
                { material: { id: 0, title: BLANK_TITLE }, quantity: 0 },
            ]);
        }
    }, [plannedMaterials, getAvailableMaterials]);

    useEffect(() => {
        const blankLines = (
            plannedWorks?.filter(({ workType: { id } }) => id === 0) || []
        ).length;
        const available = !!getAvailableWorkTypes(0).length;

        if (blankLines === 0 && available) {
            setPlannedWorks([
                ...(plannedWorks || []),
                { workType: { id: 0, title: BLANK_TITLE }, quantitySqm: 0 },
            ]);
        }
    }, [plannedWorks, getAvailableWorkTypes]);

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
            dispatch(
                updateItemRequest({
                    ...values,
                    title: `${values.region} - ${values.road} - ${values.contract}`,
                    plannedWorks: (
                        plannedWorks?.filter(
                            ({ workType: { id }, quantitySqm }) =>
                                id !== 0 && quantitySqm !== 0
                        ) || []
                    ).map(({ workType: { id }, quantitySqm }) => ({
                        workTypeId: id,
                        quantitySqm,
                    })),
                    plannedMaterials: (
                        plannedMaterials?.filter(
                            ({ material: { id }, quantity }) =>
                                id !== 0 && quantity !== 0
                        ) || []
                    ).map(({ material: { id }, quantity }) => ({
                        materialId: id,
                        quantity,
                    })),
                })
            );
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

                    <div className={styles.selectGroup}>
                        <div className={styles.selectInput}>
                            <legend>Работы</legend>
                            {plannedWorks &&
                                plannedWorks.map(
                                    ({
                                        workType: { title, id },
                                        quantitySqm,
                                    }) => (
                                        <InputGroup
                                            key={`${id}_${title}_${quantitySqm}`}
                                            selectValue={title}
                                            inputValue={quantitySqm}
                                            options={getAvailableWorkTypes(id)}
                                            onChange={({
                                                title,
                                                value,
                                            }: any) => {
                                                let workType =
                                                    plannedWorks.find(
                                                        (i) =>
                                                            i.workType.id === id
                                                    );
                                                if (workType) {
                                                    // @ts-ignore
                                                    workType.workType =
                                                        workTypes.find(
                                                            (i) =>
                                                                i.title ===
                                                                title
                                                        ) || {
                                                            title: BLANK_TITLE,
                                                            id: 0,
                                                        };
                                                    workType.quantitySqm =
                                                        parseFloat(value) || 0;
                                                }
                                                setPlannedWorks([
                                                    ...(plannedWorks?.filter(
                                                        ({
                                                            workType: { id },
                                                        }) => id !== 0
                                                    ) || []),
                                                ]);
                                            }}
                                        />
                                    )
                                )}
                        </div>

                        <div className={styles.selectInput}>
                            <legend>Материалы</legend>
                            {plannedMaterials &&
                                plannedMaterials.map(
                                    ({ material: { title, id }, quantity }) => (
                                        <InputGroup
                                            key={`${id}_${title}_${quantity}`}
                                            selectValue={title}
                                            inputValue={quantity}
                                            options={getAvailableMaterials(id)}
                                            onChange={({
                                                title,
                                                value,
                                            }: any) => {
                                                let material =
                                                    plannedMaterials.find(
                                                        (i) =>
                                                            i.material.id === id
                                                    );
                                                if (material) {
                                                    // @ts-ignore
                                                    material.material =
                                                        materials.find(
                                                            (i) =>
                                                                i.title ===
                                                                title
                                                        ) || {
                                                            title: BLANK_TITLE,
                                                            id: 0,
                                                        };
                                                    material.quantity =
                                                        parseFloat(value) || 0;
                                                }
                                                setPlannedMaterials([
                                                    ...(plannedMaterials?.filter(
                                                        ({
                                                            material: { id },
                                                        }) => id !== 0
                                                    ) || []),
                                                ]);
                                            }}
                                        />
                                    )
                                )}
                        </div>
                    </div>

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

interface InputProps {
    onChange: Function;
    options: any[];
    selectValue: any;
    inputValue: any;
}

const InputGroup: React.FC<InputProps> = ({
    selectValue,
    inputValue,
    options,
    onChange,
}) => {
    const onSelectChange = (e: any) => {
        const { value } = e.currentTarget;
        onChange({ title: value, value: inputValue });
    };
    const onInputChange = (e: any) => {
        const { value } = e.currentTarget;
        onChange({ title: selectValue, value });
    };
    return (
        <div className={styles.inputGroupWrap}>
            <Select value={selectValue} onChange={onSelectChange}>
                <option>{BLANK_TITLE}</option>
                {options.map((i) => (
                    <option key={`${i.id}-${i.title}`}>{i.title}</option>
                ))}
            </Select>
            <Input
                value={inputValue}
                onChange={onInputChange}
                autoFocus={selectValue !== BLANK_TITLE}
            />
        </div>
    );
};
