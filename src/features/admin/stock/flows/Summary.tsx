import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { IFlow, IMaterialQuantity } from 'features/flows/types';

import styles from './Item.module.scss';

moment.locale('ru');

interface Props {
    data: IFlow[];
}

const Summary: React.FC<Props> = ({ data }) => {
    const table = data.reduce((s: IMaterialQuantity[], { materials }) => {
        for (let m of materials) {
            const ex = s.find(({ material: { id } }) => id === m.material.id);
            if (ex) {
                ex.quantity += m.quantity;
            } else {
                s.push({ ...m });
            }
        }
        return s;
    }, []);

    return (
        <div className={styles.wrap}>
            <div className={styles.addonPart}>
                <table className={styles.table}>
                    <tbody>
                        {table.map(({ quantity, material: { title } }) => (
                            <tr key={`${title}x${quantity}`}>
                                <td>{title}</td>
                                <td>{quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Summary;
