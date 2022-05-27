import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest } from 'features/workObjectsSummary/actions';
import { selectList } from 'features/workObjectsSummary/selectors';
import { Select } from 'common/components';

import styles from './Panel.module.scss';

const FIXED = 1;

interface Props extends React.HTMLProps<HTMLFieldSetElement> {
    legend?: string;
}

const WorkObjectsPanel: React.FC<Props> = ({ children, legend, ...rest }) => {
    const dispatch = useDispatch();
    const _summary = useSelector(selectList);

    const [summary, setSummary] = useState(_summary);

    useEffect(() => {
        dispatch(loadRequest());
    }, [dispatch]);

    useEffect(() => {
        setSummary(_summary);
    }, [_summary]);

    return (
        <fieldset {...rest} className={styles.wrap}>
            {legend && <legend>{legend}</legend>}
            <Select
                className={styles.filter}
                onChange={({ currentTarget: { value } }) => {
                    const val = parseInt(value);
                    setSummary(
                        _summary.filter(({ workObject: { id } }) =>
                            val ? id === val : true
                        )
                    );
                }}
            >
                <option value={0}>-----</option>
                {_summary.map(({ workObject: { title, id } }) => (
                    <option value={id} key={title}>
                        {title}
                    </option>
                ))}
            </Select>
            <div>
                {summary.map(({ workObject: { title }, works, materials }) => (
                    <div className={styles.item} key={title}>
                        <div className={styles.title}>{title}</div>
                        {works && works.length > 0 && (
                            <table className={styles.elements}>
                                <caption className={styles.subTitle}>
                                    Типы работ
                                </caption>
                                <tbody>
                                    {works.map(
                                        ({
                                            workType: { title },
                                            plannedQuantitySqm,
                                            factQuantitySqm,
                                        }) => (
                                            <tr
                                                className={styles.element}
                                                key={title}
                                            >
                                                <td>{title}</td>
                                                <td className={styles.number}>
                                                    {(
                                                        plannedQuantitySqm || 0
                                                    ).toFixed(FIXED)}
                                                </td>
                                                <td className={styles.number}>
                                                    {(
                                                        factQuantitySqm || 0
                                                    ).toFixed(FIXED)}
                                                </td>
                                                <td className={styles.number}>
                                                    {(
                                                        ((factQuantitySqm ||
                                                            0) /
                                                            (plannedQuantitySqm ||
                                                                factQuantitySqm ||
                                                                1)) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        )}
                        {materials && materials.length > 0 && (
                            <table className={styles.elements}>
                                <caption className={styles.subTitle}>
                                    Материалы
                                </caption>
                                <tbody>
                                    {materials.map(
                                        ({
                                            material: { title },
                                            plannedQuantity,
                                            factQuantity,
                                        }) => (
                                            <tr
                                                className={styles.element}
                                                key={title}
                                            >
                                                <td>{title}</td>
                                                <td className={styles.number}>
                                                    {(
                                                        plannedQuantity || 0
                                                    ).toFixed(FIXED)}
                                                </td>
                                                <td className={styles.number}>
                                                    {(
                                                        factQuantity || 0
                                                    ).toFixed(FIXED)}
                                                </td>
                                                <td className={styles.number}>
                                                    {(
                                                        ((factQuantity || 0) /
                                                            (plannedQuantity ||
                                                                factQuantity ||
                                                                1)) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                ))}
            </div>
        </fieldset>
    );
};

export default WorkObjectsPanel;
