import React, { useState } from 'react';
import { Select, Input, Button, TextArea } from 'common/components';
import { useDispatch, useSelector } from 'react-redux';
import { actionItemRequest } from 'features/directories/brigades/actions';
import { selectProfile } from 'features/authentication/selectors';
import { selectItemLoading } from 'features/flows/selectors';
import { selectAll as selectWarehouses } from 'features/directories/warehouses/selectors';
import {
    selectAll as selectBrigades,
    selectItem,
} from 'features/directories/brigades/selectors';
import { selectAll as selectMaterials } from 'features/directories/materials/selectors';
import { closeModal } from 'features/modal';

import styles from './Form.module.scss';

interface Props {
    type: 'requestMaterials' | 'sendToBrigade' | 'sendToWarehouse';
}

interface IItem {
    materialId: number;
    quantity: number;
}

const Form: React.FC<Props> = ({ type }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectItemLoading);
    const profile = useSelector(selectProfile);
    const brigades = useSelector(selectBrigades).filter(
        ({ id }) => id !== profile?.brigade?.id
    );
    const warehouses = useSelector(selectWarehouses);
    const brigade = useSelector(selectItem(profile?.brigade?.id));
    const materials =
        brigade?.materials.map((i) => ({
            id: i.material.id,
            title: i.material.title,
        })) || [];
    const allMaterials = useSelector(selectMaterials);

    let [items, setItems] = useState<IItem[]>([
        {
            materialId: 0,
            quantity: 0,
        },
    ]);

    const [remarks, setRemarks] = useState('');
    const [toId, setToId] = useState<any>(null);

    const getAvailableMaterials = (items: IItem[], materialId: number) => {
        const selectedItems = items.map(({ materialId }) => materialId);
        return (type === 'requestMaterials' ? allMaterials : materials).filter(
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
            id: profile?.brigade?.id,
            materials: items.filter(
                ({ quantity, materialId }) => materialId !== 0 && quantity
            ),
            toId,
            remarks,
        };
        dispatch(actionItemRequest(data));
    };

    return (
        <>
            <h3 className={styles.formHeader}>
                {type === 'sendToBrigade'
                    ? 'Передача бригаде'
                    : type === 'sendToWarehouse'
                    ? 'Возврат на склад'
                    : 'Запрос со склада'}
            </h3>
            <form className={styles.wrap} onSubmit={onSubmit}>
                <div className={styles.inputs}>
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
                                type='number'
                                className={styles.input}
                                inputClassName={styles.input}
                                onChange={(e) => onChangeQuantity(e, key)}
                                value={quantity || ''}
                                autoComplete='off'
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
                        value={toId || 0}
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
