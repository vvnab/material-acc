import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest } from 'features/workObjectsSummary/actions';
import {
    selectList,
    // selectLoading,
    // selectError,
} from 'features/workObjectsSummary/selectors';

import styles from './Panel.module.scss';

const FIXED = 1;

interface Props extends React.HTMLProps<HTMLFieldSetElement> {
    legend?: string;
}

const WorkObjectsPanel: React.FC<Props> = ({ children, legend, ...rest }) => {
    const dispatch = useDispatch();
    const summary = useSelector(selectList);

    useEffect(() => {
        dispatch(loadRequest());
    }, [dispatch]);

    return (
        <fieldset {...rest} className={styles.wrap}>
            {legend && <legend>{legend}</legend>}
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
