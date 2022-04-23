import ReactDOM from 'react-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessages } from './selectors';
import { hideMessage } from './actions';

import styles from './Message.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const Message: React.FC<IProps> = ({ className }) => {
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages);

    const render = () =>
        messages && (
            <div className={styles.container}>
                {messages.map((message) => (
                    <div
                        className={[styles.wrap, className].join(' ')}
                        key={message.id}
                        onClick={() => dispatch(hideMessage(message.id))}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
        );
    // @ts-ignore
    return ReactDOM.createPortal(render(), document.getElementById('message'));
};

export default Message;
