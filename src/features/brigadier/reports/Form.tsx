import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
    Select,
    Input,
    Button,
    TextArea,
    Datetime,
    Loader,
    ReactSelect,
} from 'common/components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { updateItemRequest } from 'features/reports/actions';
import { selectItemLoading, selectItemError } from 'features/reports/selectors';
import { showMessage } from 'features/message/actions';
import { selectProfile } from 'features/authentication/selectors';
import { selectAll as selectWorkTypes } from 'features/directories/workTypes/selectors';
import { selectAll as selectRoadSigns } from 'features/directories/roadSigns/selectors';
import { selectAll as selectWorkObjects } from 'features/directories/workObjects/selectors';
import { selectItem } from 'features/directories/brigades/selectors';
import { closeModal } from 'features/modal';

import styles from './Form.module.scss';
import { IReport } from 'features/reports/types';

interface Props {
    report?: IReport;
}

interface IMaterialsItem {
    materialId: number;
    quantity: number | '';
}

interface IWorkItem {
    workTypeId: number;
    roadSignId: number;
    volume: number | '';
}

const Form: React.FC<Props> = ({ report }) => {
    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const isLoading = useSelector(selectItemLoading);
    const error = useSelector(selectItemError);
    const workObjects = useSelector(selectWorkObjects);
    const workTypes = useSelector(selectWorkTypes);
    const roadSigns = useSelector(selectRoadSigns);
    const brigade = useSelector(selectItem(profile?.brigade?.id));
    const materials =
        brigade?.materials.map((i) => ({
            id: i.material.id,
            title: i.material.title,
        })) || [];

    const formik = useFormik({
        initialValues: {
            workObjectId: report?.workObject?.id || '0',
            workStart: (report?.workStart
                ? moment(report?.workStart)
                : moment().startOf('day').add(8, 'hours')
            ).format('YYYY-MM-DDTHH:mm'),
            workEnd: (report?.workEnd
                ? moment(report?.workEnd)
                : moment().startOf('day').add(20, 'hours')
            ).format('YYYY-MM-DDTHH:mm'),
            tairStart: report?.tairStart || '',
            tairEnd: report?.tairEnd || '',
            troadStart: report?.troadStart || '',
            troadEnd: report?.troadEnd || '',
            humStart: report?.humStart || '',
            humEnd: report?.humEnd || '',
            remarks: report?.remarks || '',
        },
        validate: (values) => {
            let errors: any = {};

            if (values.workObjectId === 0 || values.workObjectId === '0') {
                errors.workObjectId = 'Должно быть заполнено';
            }
            if (!values.workStart) {
                errors.workStart = 'Должно быть заполнено';
            }
            if (!values.workEnd) {
                errors.workEnd = 'Должно быть заполнено';
            }
            if (values.workStart >= values.workEnd) {
                errors.workEnd = '!';
                errors.workStart = '!';
                dispatch(
                    showMessage({
                        type: 'error',
                        text: 'Дата окончания меньше даты начала',
                    })
                );
            }
            if (!values.tairStart) {
                errors.tairStart = '?';
            }
            if (!values.tairEnd) {
                errors.tairEnd = '?';
            }
            if (!values.troadStart) {
                errors.troadStart = '?';
            }
            if (!values.troadEnd) {
                errors.troadEnd = '?';
            }
            if (!values.humStart) {
                errors.humStart = '?';
            }
            if (!values.humEnd) {
                errors.humEnd = '?';
            }
            if (worksFuncs.getCurrect().length === 0) {
                errors.workItems = 'должно быть заполнено';
            }
            if (
                materialsFuncs.getCurrect().length === 0 &&
                !worksFuncs.getCurrect().reduce((s, i) => {
                    console.log(i)
                    s = s && i.workTypeId === 1;
                    return s;
                }, true)
            ) {
                errors.materialsItems = 'должно быть заполнено';
            }
            return errors;
        },
        onSubmit: (values) => {
            const data = {
                id: report?.id,
                brigadeId: profile?.brigade?.id,
                ...values,
                workStart: moment(values.workStart).toJSON(),
                workEnd: moment(values.workEnd).toJSON(),
                materials: materialsFuncs.getCurrect(),
                works: worksFuncs.getCurrect(),
            };
            dispatch(updateItemRequest(data));
        },
    });

    const materialsNullItem = {
        materialId: 0,
        quantity: '',
    };
    const materialsInit: any = report?.materials.map((i) => ({
        materialId: i.material.id,
        quantity: i.quantity,
    }));
    let [materialsItems, setMaterialsItems] = useState<IMaterialsItem[]>([
        ...(materialsInit || []),
        materialsNullItem,
    ]);

    const workNullItem = {
        workTypeId: 0,
        roadSignId: 0,
        volume: '',
    };
    const workItemsInit: any = report?.works.map((i) => ({
        workTypeId: i.workType.id,
        roadSignId: i.roadSign.id,
        volume: i.volume,
    }));
    let [workItems, setWorkItems] = useState<IWorkItem[]>([
        ...(workItemsInit || []),
        workNullItem,
    ]);

    const materialsFuncs = {
        getAvailable: (items: IMaterialsItem[], materialId: number) => {
            const selectedItems = items.map(({ materialId }) => materialId);
            return materials.filter(
                ({ id }) =>
                    !selectedItems.includes(id || 0) || id === materialId
            );
        },
        onChange: ({ currentTarget: { value } }: any, key: number) => {
            value = parseInt(value) || '';
            materialsItems[key].materialId = value;
            materialsItems = materialsItems.filter(
                ({ materialId }) => materialId
            );

            materialsItems = materialsItems.filter((i) => i.materialId);
            materialsItems.push({
                materialId: 0,
                quantity: '',
            });

            setMaterialsItems([...materialsItems]);
        },
        onChangeQuantity: ({ currentTarget: { value } }: any, key: number) => {
            value = parseInt(value) || '';
            materialsItems[key].quantity = value;
            setMaterialsItems([...materialsItems]);
        },
        getCurrect: () => materialsItems.filter((i) => i.quantity),
    };

    const worksFuncs = {
        getAvailable: (items: IWorkItem[], workTypeId: number) => {
            return workTypes;
            // const selectedItems = items.map(({ workTypeId }) => workTypeId);
            // return workTypes.filter(
            //     ({ id }) =>
            //         !selectedItems.includes(id || 0) || id === workTypeId
            // );
        },
        onChangeWorkType: ({ currentTarget: { value } }: any, key: number) => {
            value = parseInt(value) || '';
            workItems[key].workTypeId = value;

            workItems = workItems.filter(({ workTypeId }) => workTypeId);

            workItems = workItems.filter((i) => i.workTypeId);
            workItems.push({
                workTypeId: 0,
                roadSignId: 0,
                volume: '',
            });

            setWorkItems([...workItems]);
        },
        onChangeRoadSign: ({ value }: any, key: number) => {
            value = parseInt(value) || '';
            if (workItems[key].workTypeId) {
                workItems[key].roadSignId = value;
                setWorkItems([...workItems]);
            }
        },
        onChangeVolume: ({ currentTarget: { value } }: any, key: number) => {
            value = parseInt(value) || '';
            workItems[key].volume = value;
            setWorkItems([...workItems]);
        },
        getCurrect: () => workItems.filter((i) => i.volume),
    };

    return isLoading ? (
        <Loader className={styles.loader} />
    ) : (
        <form className={styles.wrap} onSubmit={formik.handleSubmit}>
            <div className={styles.inputs}>
                <Select
                    name='workObjectId'
                    className={styles.select}
                    legend='Объект'
                    onChange={formik.handleChange}
                    value={formik.values.workObjectId}
                    error={
                        formik.touched.workObjectId &&
                        formik.errors.workObjectId
                    }
                >
                    <option key={0} value={0}>
                        ------
                    </option>
                    {workObjects.map(({ title, id }) => (
                        <option key={id} value={id}>
                            {title}
                        </option>
                    ))}
                </Select>
                <div className={styles.inputGroup2}>
                    <Datetime
                        name='workStart'
                        legend='Начало'
                        type='datetime-local'
                        format='DD MMM HH:mm'
                        onChange={formik.handleChange}
                        value={formik.values.workStart}
                        error={formik.errors.workStart}
                    />
                    <Datetime
                        name='workEnd'
                        legend='Окончание'
                        type='datetime-local'
                        format='DD MMM HH:mm'
                        onChange={formik.handleChange}
                        value={formik.values.workEnd}
                        error={formik.errors.workEnd}
                    />
                </div>
                <div className={styles.inputGroup2}>
                    <Input
                        name='tairStart'
                        legend='t° возд. нач.'
                        type='number'
                        autoComplete='off'
                        className={styles.input}
                        inputClassName={styles.input}
                        onChange={formik.handleChange}
                        value={formik.values.tairStart}
                        error={
                            formik.touched.tairStart && formik.errors.tairStart
                        }
                    />
                    <Input
                        name='tairEnd'
                        legend='t° возд. конечн.'
                        type='number'
                        autoComplete='off'
                        className={styles.input}
                        inputClassName={styles.input}
                        onChange={formik.handleChange}
                        value={formik.values.tairEnd}
                        error={formik.touched.tairEnd && formik.errors.tairEnd}
                    />
                </div>

                <div className={styles.inputGroup2}>
                    <Input
                        name='troadStart'
                        legend='t° полотна нач.'
                        type='number'
                        autoComplete='off'
                        className={styles.input}
                        inputClassName={styles.input}
                        onChange={formik.handleChange}
                        value={formik.values.troadStart}
                        error={
                            formik.touched.troadStart &&
                            formik.errors.troadStart
                        }
                    />
                    <Input
                        name='troadEnd'
                        legend='t° полотна конечн.'
                        type='number'
                        autoComplete='off'
                        className={styles.input}
                        inputClassName={styles.input}
                        onChange={formik.handleChange}
                        value={formik.values.troadEnd}
                        error={
                            formik.touched.troadEnd && formik.errors.troadEnd
                        }
                    />
                </div>

                <div className={styles.inputGroup2}>
                    <Input
                        name='humStart'
                        legend='Влажность нач.'
                        type='number'
                        autoComplete='off'
                        className={styles.input}
                        inputClassName={styles.input}
                        onChange={formik.handleChange}
                        value={formik.values.humStart}
                        error={
                            formik.touched.humStart && formik.errors.humStart
                        }
                    />
                    <Input
                        name='humEnd'
                        legend='Влажность конечн.'
                        type='number'
                        autoComplete='off'
                        className={styles.input}
                        inputClassName={styles.input}
                        onChange={formik.handleChange}
                        value={formik.values.humEnd}
                        error={formik.touched.humEnd && formik.errors.humEnd}
                    />
                </div>

                <h3 className={styles.legend}>
                    Работы:{' '}
                    <span className={styles.error}>
                        {(formik.errors as any).workItems}
                    </span>
                </h3>
                {workItems.map(
                    ({ workTypeId, roadSignId, volume }, key) =>
                        worksFuncs.getAvailable(workItems, workTypeId).length >
                            0 && (
                            <fieldset
                                className={[
                                    styles.inputGroup,
                                    styles.workTypes,
                                ].join(' ')}
                                key={key}
                            >
                                <Select
                                    legend='тип'
                                    name={`workTypeId-${key}`}
                                    className={styles.select}
                                    onChange={(e) =>
                                        worksFuncs.onChangeWorkType(e, key)
                                    }
                                    value={workTypeId}
                                >
                                    <option key={0} value={0}>
                                        ------
                                    </option>
                                    {worksFuncs
                                        .getAvailable(workItems, workTypeId)
                                        .map(({ title, id }) => (
                                            <option key={id} value={id}>
                                                {title}
                                            </option>
                                        ))}
                                </Select>
                                <ReactSelect
                                    legend='разметка'
                                    className={[
                                        styles.select,
                                        styles.react,
                                    ].join(' ')}
                                    name={`roadSignId-${key}`}
                                    isDisabled={!workTypeId}
                                    options={roadSigns.map(({ title, id }) => ({
                                        value: id,
                                        label: title,
                                    }))}
                                    onChange={(e: any) =>
                                        worksFuncs.onChangeRoadSign(e, key)
                                    }
                                />
                                {/* <Select
                                    legend='разметка'
                                    name={`roadSignId-${key}`}
                                    className={styles.select}
                                    onChange={(e) =>
                                        worksFuncs.onChangeRoadSign(e, key)
                                    }
                                    disabled={!workTypeId}
                                    value={roadSignId}
                                >
                                    <option key={0} value={0}>
                                        ------
                                    </option>
                                    {roadSigns.map(({ title, id }) => (
                                        <option key={id} value={id}>
                                            {title}
                                        </option>
                                    ))}
                                </Select> */}
                                <Input
                                    legend={`${(
                                        (roadSigns.find(
                                            (i) => i.id === roadSignId
                                        )?.pmToSqm || 0) * (volume || 0)
                                    ).toFixed(1)} м²`}
                                    name={`volume-${key}`}
                                    type='number'
                                    autoComplete='off'
                                    className={styles.input}
                                    inputClassName={styles.input}
                                    onChange={(e) =>
                                        worksFuncs.onChangeVolume(e, key)
                                    }
                                    value={volume}
                                    disabled={!workTypeId}
                                />
                            </fieldset>
                        )
                )}

                <h3 className={styles.legend}>
                    Материалы:{' '}
                    <span className={styles.error}>
                        {(formik.errors as any).materialsItems}
                    </span>
                </h3>
                {materialsItems.map(
                    ({ materialId, quantity }, key) =>
                        materialsFuncs.getAvailable(materialsItems, materialId)
                            .length > 0 && (
                            <fieldset className={styles.inputGroup} key={key}>
                                <Select
                                    name={`materialId-${key}`}
                                    className={styles.select}
                                    onChange={(e) =>
                                        materialsFuncs.onChange(e, key)
                                    }
                                    value={materialId}
                                >
                                    <option key={0} value={0}>
                                        ------
                                    </option>
                                    {materialsFuncs
                                        .getAvailable(
                                            materialsItems,
                                            materialId
                                        )
                                        .map(({ title, id }) => (
                                            <option key={id} value={id}>
                                                {title}
                                            </option>
                                        ))}
                                </Select>
                                <Input
                                    name={`quantity-${key}`}
                                    type='number'
                                    autoComplete='off'
                                    className={styles.input}
                                    inputClassName={styles.input}
                                    onChange={(e) =>
                                        materialsFuncs.onChangeQuantity(e, key)
                                    }
                                    value={quantity}
                                    disabled={!materialId}
                                />
                            </fieldset>
                        )
                )}

                <TextArea
                    rows={5}
                    name='remarks'
                    legend='Примечание'
                    onChange={formik.handleChange}
                    value={formik.values.remarks}
                    error={formik.touched.remarks && formik.errors.remarks}
                />
            </div>
            {error && <div className={styles.itemError}>{error}</div>}
            <div className={styles.buttonGroup}>
                {
                    <Button
                        type='button'
                        option='dangerous'
                        className={styles.button}
                        disabled={isLoading}
                        onClick={(e) => dispatch(closeModal())}
                    >
                        Отмена
                    </Button>
                }
                <Button
                    className={styles.button}
                    disabled={isLoading}
                    type='submit'
                >
                    Сохранить
                </Button>
            </div>
        </form>
    );
};

export default Form;
