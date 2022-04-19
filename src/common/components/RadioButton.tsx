import React from 'react';

import styles from './RadioButton.module.scss';

interface Props extends React.HTMLProps<HTMLButtonElement> {
    className?: string;
    type?: any;
    selected?: boolean;
}

const RadioButton: React.FC<Props> = ({
    className,
    type,
    selected = false,
    ...rest
}) => {
    return (
        <button
            className={[
                styles.wrap,
                selected ? styles.dangerous : '',
                className,
            ].join(' ')}
            type={type}
            {...rest}
        />
    );
};

export default RadioButton;
