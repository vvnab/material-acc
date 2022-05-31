import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes as iconDel } from '@fortawesome/free-solid-svg-icons';
import { IPhoto } from 'features/reports/types';
import styles from './Images.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    className?: string;
    images: IPhoto[];
    del?: Function;
}

const Images: React.FC<Props> = ({
    className,
    images,
    title,
    del,
    ...rest
}) => {
    return (
        <>
            <div className={styles.title}>{title}</div>
            <div className={[styles.wrap, className].join(' ')} {...rest}>
                {images.map(({ id, previewName, fileName }) => (
                    <div className={styles.image} key={id}>
                        <a
                            href={`http://lk.dknord.ru${fileName}`}
                            target='__blank'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                alt={`${id}`}
                                src={`http://lk.dknord.ru${previewName}`}
                            />
                        </a>
                        {del && (
                            <div
                                className={styles.times}
                                onClick={(e) => {
                                    del(id);
                                    e.stopPropagation();
                                }}
                            >
                                <FontAwesomeIcon icon={iconDel} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Images;
