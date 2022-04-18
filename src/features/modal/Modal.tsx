import ReactDOM from 'react-dom';
import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { closeModal } from './actions';
import { selectShow, selectComponent } from './selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark as closeIcon } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    noTimes?: boolean;
    name?: string;
    closeOnClickOutside?: boolean;
}

const Modal: React.FC<IProps> = ({
    className,
    noTimes = false,
    name = 'modal',
    closeOnClickOutside = false,
}) => {
    const dispatch = useDispatch();
    const close = () => {
        dispatch(closeModal());
    };
    const show = useSelector(selectShow);
    const component = useSelector(selectComponent);
    const el = useRef(null);

    const handleClickOutside = (e: MouseEvent) => {
        // @ts-ignore
        if (el && el.current && el.current.contains(e.target)) {
            return;
        } else {
            closeOnClickOutside && close();
        }
    };

    useEffect(() => {
        if (show) {
            const sclollWidth =
                window.innerWidth - document.documentElement.clientWidth;
            const isDesktop = window.innerWidth > 1280;
            document.addEventListener('mousedown', handleClickOutside, false);
            document.body.style.overflowY = 'hidden';

            if (isDesktop) document.body.style.marginRight = `${sclollWidth}px`;
        }
        return () => {
            document.body.style.overflowY = 'auto';
            document.body.style.marginRight = '0';
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
                false
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    const render = () =>
        show && (
            <div className={styles.overlay} data-name={name}>
                {noTimes ? (
                    <div
                        className={[styles.wrap, className].join(' ')}
                        ref={el}
                    >
                        {component}
                    </div>
                ) : (
                    <div className={styles.container}>
                        <div
                            className={[styles.wrap, className].join(' ')}
                            ref={el}
                        >
                            <div
                                className={styles.close}
                                onClick={() => close()}
                            >
                                <div className={styles.times}>
                                    <FontAwesomeIcon icon={closeIcon} />
                                </div>
                            </div>

                            {component}
                        </div>
                    </div>
                )}
            </div>
        );
    // @ts-ignore
    return ReactDOM.createPortal(render(), document.getElementById('modal'));
};

export default Modal;
