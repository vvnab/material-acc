import React from 'react';
import Select from 'react-select';

import styles from './ReactSelect.module.scss';

interface Props {
    className?: string;
    selectClassName?: string;
    legend?: string;
    error?: string | false;
    ref?: any;
    [name: string]: any;
}

const ReactSelect: React.FC<Props> = ({
    className,
    selectClassName,
    legend,
    error,
    ...rest
}) => {
    return (
        <div className={[styles.container, className].join(' ')}>
            {legend && (
                <legend>
                    {legend}
                    {error && `: ${error?.toLowerCase()}`}
                </legend>
            )}

            <Select
                className={[styles.wrap, selectClassName].join(' ')}
                // menuIsOpen={true}
                placeholder='-----'
                {...rest}
            />
        </div>
    );
};

export default ReactSelect;
