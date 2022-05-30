import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest, updateRange } from 'features/brigadesSummary/actions';
import { selectList, selectRange } from 'features/brigadesSummary/selectors';
import { Datetime } from 'common/components';

import styles from './Panel.module.scss';

const FIXED = 1;

interface Props extends React.HTMLProps<HTMLFieldSetElement> {
    legend?: string;
}

const Panel: React.FC<Props> = ({ children, legend, ...rest }) => {
    const dispatch = useDispatch();
    const summary = useSelector(selectList);
    const { from, to } = useSelector(selectRange);

    useEffect(() => {
        dispatch(loadRequest());
    }, [dispatch]);

    return (
        <fieldset {...rest} className={styles.wrap}>
            {legend && <legend>{legend}</legend>}
            <div className={styles.range}>
                <Datetime
                    legend='Начало'
                    value={moment(from).format('YYYY-MM-DD')}
                    onChange={(e) =>
                        dispatch(
                            updateRange({
                                from: moment(e.currentTarget.value)
                                    .startOf('day')
                                    .toJSON(),
                                to,
                            })
                        )
                    }
                />
                <Datetime
                    legend='Окончание'
                    value={moment(to).format('YYYY-MM-DD')}
                    onChange={(e) =>
                        dispatch(
                            updateRange({
                                from,
                                to: moment(e.currentTarget.value)
                                    .endOf('day')
                                    .toJSON(),
                            })
                        )
                    }
                />
            </div>
            <div>
                {summary
                    .filter(
                        ({ works, materials }) =>
                            works.length || materials.length
                    )
                    .map(({ brigade: { title }, works, materials }) => (
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
                                                factQuantitySqm,
                                            }) => (
                                                <tr
                                                    className={styles.element}
                                                    key={title}
                                                >
                                                    <td>{title}</td>
                                                    <td
                                                        className={
                                                            styles.number
                                                        }
                                                    >
                                                        {(
                                                            factQuantitySqm || 0
                                                        ).toFixed(FIXED)}
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
                                                factQuantity,
                                            }) => (
                                                <tr
                                                    className={styles.element}
                                                    key={title}
                                                >
                                                    <td>{title}</td>
                                                    <td
                                                        className={
                                                            styles.number
                                                        }
                                                    >
                                                        {(
                                                            factQuantity || 0
                                                        ).toFixed(FIXED)}
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

export default Panel;
