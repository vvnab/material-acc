import React, { useState } from 'react';
import { Select, Input, Button, Checkbox, TextArea } from 'common/components';
import { IMaterial } from 'features/directories/materials/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemRequest } from './actions';
import { selectItemLoading, selectList } from './selectors';
import { closeModal } from 'features/modal';
import { selectAll as selectWarehouses } from 'features/directories/warehouses/selectors';

import styles from './Form.module.scss';

interface Props {
    materials: IMaterial[];
    brigadeId: number;
    type: 'requestMaterials' | 'sendToBrigade' | 'sendToWarehouse';
}

interface IItem {
    materialId: number;
    quantity: number;
}

const Form: React.FC<Props> = ({ materials, brigadeId, type }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectItemLoading);
    const brigades = useSelector(selectList).filter(
        ({ id }) => id !== brigadeId
    );
    const warehouses = useSelector(selectWarehouses);

    let [items, setItems] = useState<IItem[]>([
        {
            materialId: 0,
            quantity: 0,
        },
    ]);

    const [checked, setChecked] = useState(true);
    const [remarks, setRemarks] = useState('');
    const [toId, setToId] = useState<any>(null);

    const getAvailableMaterials = (items: IItem[], materialId: number) => {
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
        items[key].materialId = value;
        const availableMaterials = getAvailableMaterials(items, 0);

        items = items.filter(({ materialId }) => materialId !== 0);

        if (
            (availableMaterials.length < materials.length &&
                items.slice(-1)[0].materialId !== 0) ||
            items.length === 0
        ) {
            items.push({
                materialId: 0,
                quantity: 0,
            });
        }

        setItems([...items]);
    };

    const onChangeQuantity = (
        { currentTarget: { value } }: any,
        key: number
    ) => {
        value = parseInt(value);
        items[key].quantity = value;
        setItems([...items]);
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        const data = {
            type,
            id: brigadeId,
            materials: items.filter(
                ({ quantity, materialId }) => materialId !== 0 && quantity !== 0
            ),
            acceptFlow: checked,
            toId,
            remarks,
        };
        dispatch(updateItemRequest(data));
    };

    return (
        <>
            <form className={styles.wrap} onSubmit={onSubmit}>
                {items.map(({ materialId, quantity }, key) => (
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
                            {getAvailableMaterials(items, materialId).map(
                                ({ title, id }) => (
                                    <option key={id} value={id}>
                                        {title}
                                    </option>
                                )
                            )}
                        </Select>
                        <Input
                            name='quantity'
                            className={styles.input}
                            inputClassName={styles.input}
                            onChange={(e) => onChangeQuantity(e, key)}
                            value={quantity}
                        />
                    </fieldset>
                ))}
                <Select
                    name='to'
                    className={styles.select}
                    legend={
                        type === 'sendToBrigade'
                            ? 'Бригада назначения'
                            : type === 'sendToWarehouse'
                            ? 'Склад назначения'
                            : 'Запрос со склада'
                    }
                    onChange={(e) => setToId(e.currentTarget.value)}
                    value={toId}
                >
                    <option key={0} value={0}>
                        ------
                    </option>
                    {(type === 'sendToBrigade' ? brigades : warehouses).map(
                        ({ title, id }) => (
                            <option key={id} value={id}>
                                {title}
                            </option>
                        )
                    )}
                </Select>
                <TextArea
                    rows={5}
                    legend='Примечание'
                    value={remarks}
                    onChange={(e) => setRemarks(e.currentTarget.value)}
                />
                <Checkbox
                    onChange={() => setChecked(!checked)}
                    defaultChecked={checked}
                >
                    Принять без подтверждения
                </Checkbox>
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
                        disabled={isLoading || !parseInt(toId)}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Form;
