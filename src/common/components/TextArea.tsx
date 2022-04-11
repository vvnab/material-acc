import React from 'react';

import styles from './TextArea.module.scss';

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
    error?: string;
}

const TextArea: React.FC<Props> = ({ placeholder, error, className, ...rest }) => {
    return (
        <textarea
            placeholder={placeholder}
            {...rest}
            className={[styles.wrap, className, error ? styles.error : ''].join(
                ' '
            )}
        />
    );
};

export default TextArea;
