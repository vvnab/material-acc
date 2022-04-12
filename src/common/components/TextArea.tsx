import React from 'react';

import styles from './TextArea.module.scss';

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
    error?: string | false;
    legend?: string;
}

const TextArea: React.FC<Props> = ({
    placeholder,
    error,
    legend,
    className,
    ...rest
}) => {
    return (
        <div className={styles.container}>
            {legend && (
                <legend className={styles.legend}>
                    {legend}
                    {error && `: ${error?.toLowerCase()}`}
                </legend>
            )}
            <textarea
                placeholder={placeholder}
                {...rest}
                className={[
                    styles.wrap,
                    className,
                    error ? styles.error : '',
                ].join(' ')}
            />
        </div>
    );
};

export default TextArea;
