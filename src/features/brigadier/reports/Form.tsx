import React, { useState } from 'react';
import { Select, Input, Button, TextArea, Datetime } from 'common/components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { updateItemRequest } from 'features/admin/stock/brigades/actions';
import { selectItemLoading, selectBrigade } from './selectors';
import { selectAll as selectWorkTypes } from 'features/directories/workTypes/selectors';
import { selectAll as selectRoadSigns } from 'features/directories/roadSigns/selectors';
import { selectAll as selectMaterials } from 'features/directories/materials/selectors';
import { selectAll as selectWorkObjects } from 'features/directories/workObjects/selectors';
import { closeModal } from 'features/modal';

import styles from './Form.module.scss';
import { IReport } from 'features/admin/reports/types';

interface Props {
    report?: IReport;
}

interface IMaterialsItem {
    materialId: number;
    quantity: number;
}

interface IWorkItem {
    workTypeId: number;
    roadSignId: number;
    volume: number;
}

const Form: React.FC<Props> = ({ report }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectItemLoading);
    const brigade = useSelector(selectBrigade);
    const workObjects = useSelector(selectWorkObjects);
    const workTypes = useSelector(selectWorkTypes);
    const roadSigns = useSelector(selectRoadSigns);
    const materials = useSelector(selectMaterials);

    let [materialsItems, setMaterialsItems] = useState<IMaterialsItem[]>([
        {
            materialId: 0,
            quantity: 0,
        },
    ]);

    let [workItems, setWorkItems] = useState<IWorkItem[]>([
        {
            workTypeId: 0,
            roadSignId: 0,
            volume: 0,
        },
    ]);

    const [workStart, setWorkStart] = useState(moment().startOf('day').toISOString());
    const [workEnd, setWorkEnd] = useState(moment().endOf('day').toISOString());

    const [remarks, setRemarks] = useState('');

    const getAvailableMaterials = (
        items: IMaterialsItem[],
        materialId: number
    ) => {
        const selectedItems = items.map(({ materialId }) => materialId);
        return materials.filter(
            ({ id }) => !selectedItems.includes(id || 0) || id === materialId
        );
    };

    const onChangeMaterial = (
        { currentTarget: { value } }: any,
        key: number
    ) => {
        value = parseInt(value);
        materialsItems[key].materialId = value;
        const availableMaterials = getAvailableMaterials(materialsItems, 0);

        materialsItems = materialsItems.filter(
            ({ materialId }) => materialId !== 0
        );

        if (
            (availableMaterials.length <= materials.length &&
                materialsItems.slice(-1)[0].materialId !== 0) ||
            materialsItems.length === 0
        ) {
            materialsItems.push({
                materialId: 0,
                quantity: 0,
            });
        }

        setMaterialsItems([...materialsItems]);
    };

    const onChangeQuantity = (
        { currentTarget: { value } }: any,
        key: number
    ) => {
        value = parseInt(value);
        materialsItems[key].quantity = value;
        setMaterialsItems([...materialsItems]);
    };

    const getAvailableWorks = (items: IWorkItem[], workTypeId: number) => {
        const selectedItems = items.map(({ workTypeId }) => workTypeId);
        return workTypes.filter(
            ({ id }) => !selectedItems.includes(id || 0) || id === workTypeId
        );
    };

    const onChangeWorkType = (
        { currentTarget: { value } }: any,
        key: number
    ) => {
        value = parseInt(value);
        workItems[key].workTypeId = value;
        const availableWorkTypes = getAvailableWorks(workItems, 0);

        workItems = workItems.filter(({ workTypeId }) => workTypeId !== 0);
        if (
            (availableWorkTypes.length <= workItems.length &&
                workItems.slice(-1)[0].workTypeId !== 0) ||
            workItems.length === 0
        ) {
            workItems.push({
                workTypeId: 0,
                roadSignId: 0,
                volume: 0,
            });
        }

        setWorkItems([...workItems]);
    };

    const onChangeRoadSign = (
        { currentTarget: { value } }: any,
        key: number
    ) => {
        value = parseInt(value);
        if (workItems[key].workTypeId) {
            workItems[key].roadSignId = value;
            setWorkItems([...workItems]);
        }
    };

    const onChangeVolume = ({ currentTarget: { value } }: any, key: number) => {
        value = parseInt(value);
        workItems[key].volume = value;
        setWorkItems([...workItems]);
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        const data = {
            id: brigade?.id,
            materials: materialsItems.filter(
                ({ quantity, materialId }) => materialId !== 0 && quantity !== 0
            ),
            remarks,
        };
        dispatch(updateItemRequest(data));
    };

    return (
        <form className={styles.wrap} onSubmit={onSubmit}>
            <div className={styles.inputs}>
                <Select
                    name='workObjectId'
                    className={styles.select}
                    legend='Объект'
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
                        className={styles.input}
                        date={workStart}
                        type='datetime-local'
                        format='DD MMM HH:mm'
                        onChange={(e) => setWorkStart(e.currentTarget.value)}
                        // inputClassName={styles.input}
                    />
                    <Datetime
                        name='workEnd'
                        legend='Окончание'
                        className={styles.input}
                        date={workEnd}
                        type='datetime-local'
                        format='DD MMM HH:mm'
                        onChange={(e) => setWorkEnd(e.currentTarget.value)}
                        // inputClassName={styles.input}
                    />
                </div>
                <div className={styles.inputGroup2}>
                    <Input
                        name='tairStart'
                        legend='Темп. возд. нач.'
                        type='tel'
                        className={styles.input}
                        inputClassName={styles.input}
                    />
                    <Input
                        name='tairEnd'
                        legend='Темп. возд. конечн.'
                        type='tel'
                        className={styles.input}
                        inputClassName={styles.input}
                    />
                </div>

                <div className={styles.inputGroup2}>
                    <Input
                        name='troadStart'
                        legend='Темп. полотна нач.'
                        type='tel'
                        className={styles.input}
                        inputClassName={styles.input}
                    />
                    <Input
                        name='troadEnd'
                        legend='Темп. плотна конечн.'
                        type='tel'
                        className={styles.input}
                        inputClassName={styles.input}
                    />
                </div>

                <div className={styles.inputGroup2}>
                    <Input
                        name='tairStart'
                        legend='Влажность нач.'
                        type='tel'
                        className={styles.input}
                        inputClassName={styles.input}
                    />
                    <Input
                        name='tairEnd'
                        legend='Влажность конечн.'
                        type='tel'
                        className={styles.input}
                        inputClassName={styles.input}
                    />
                </div>

                <h3 className={styles.legend}>Работы:</h3>
                {workItems.map(
                    ({ workTypeId, roadSignId, volume }, key) =>
                        getAvailableWorks(workItems, workTypeId).length > 0 && (
                            <fieldset className={styles.inputGroup} key={key}>
                                <Select
                                    name='workTypeId'
                                    className={styles.select}
                                    onChange={(e) => onChangeWorkType(e, key)}
                                    value={workTypeId}
                                >
                                    <option key={0} value={0}>
                                        ------
                                    </option>
                                    {getAvailableWorks(
                                        workItems,
                                        workTypeId
                                    ).map(({ title, id }) => (
                                        <option key={id} value={id}>
                                            {title}
                                        </option>
                                    ))}
                                </Select>
                                <Select
                                    name='roadSignId'
                                    className={styles.select}
                                    onChange={(e) => onChangeRoadSign(e, key)}
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
                                </Select>
                                <Input
                                    name='quantity'
                                    type='tel'
                                    className={styles.input}
                                    inputClassName={styles.input}
                                    onChange={(e) => onChangeVolume(e, key)}
                                    value={volume}
                                />
                            </fieldset>
                        )
                )}

                <h3 className={styles.legend}>Материалы:</h3>
                {materialsItems.map(
                    ({ materialId, quantity }, key) =>
                        getAvailableMaterials(materialsItems, materialId)
                            .length > 0 && (
                            <fieldset className={styles.inputGroup} key={key}>
                                <Select
                                    name='materialId'
                                    className={styles.select}
                                    onChange={(e) => onChangeMaterial(e, key)}
                                    value={materialId}
                                >
                                    <option key={0} value={0}>
                                        ------
                                    </option>
                                    {getAvailableMaterials(
                                        materialsItems,
                                        materialId
                                    ).map(({ title, id }) => (
                                        <option key={id} value={id}>
                                            {title}
                                        </option>
                                    ))}
                                </Select>
                                <Input
                                    name='quantity'
                                    type='tel'
                                    className={styles.input}
                                    inputClassName={styles.input}
                                    onChange={(e) => onChangeQuantity(e, key)}
                                    value={quantity}
                                />
                            </fieldset>
                        )
                )}

                <TextArea
                    rows={5}
                    legend='Примечание'
                    value={remarks}
                    onChange={(e) => setRemarks(e.currentTarget.value)}
                />
            </div>
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
                <Button className={styles.button} disabled={isLoading}>
                    Сохранить
                </Button>
            </div>
        </form>
    );
};

export default Form;
