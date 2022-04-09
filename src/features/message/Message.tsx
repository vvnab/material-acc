import ReactDOM from 'react-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectMessage, selectShow } from './selectors';

import styles from './Message.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const Message: React.FC<IProps> = ({ className }) => {
    const message = useSelector(selectMessage);
    const show = useSelector(selectShow);

    const render = () =>
        show &&
        message && (
            <div className={styles.container}>
                <div className={[styles.wrap, className].join(' ')}>
                    {message.text}
                </div>
            </div>
        );
    // @ts-ignore
    return ReactDOM.createPortal(render(), document.getElementById('message'));
};

export default Message;
