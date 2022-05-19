import React from 'react';
import { useFormik } from 'formik';
import { TextArea, Button } from 'common/components';
import { IComment } from 'features/tasks/types';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCommentRequest,
    deleteCommentRequest,
} from 'features/tasks/actions';
import { selectItemLoading } from 'features/tasks/selectors';

import styles from './Form.module.scss';

interface Props extends IComment {
    taskId?: number;
}

const CommentForm: React.FC<Props> = ({ taskId, ...item }) => {
    const { id } = item;
    const isLoading = useSelector(selectItemLoading);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: { ...item },
        validate: ({ comment }) => {
            let errors: any = {};

            if (!comment) {
                errors.comment = 'Поле не должно быть пустым';
            }
            return errors;
        },
        onSubmit: (values: any) => {
            dispatch(addCommentRequest({ taskId, ...values }));
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className={styles.wrap}>
                <fieldset className={styles.inputGroup}>
                    <TextArea
                        name='comment'
                        rows={6}
                        placeholder='Текст комментария'
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                        error={formik.errors.comment}
                    />
                </fieldset>

                <div className={styles.buttonGroup}>
                    {id && (
                        <Button
                            type='button'
                            option='dangerous'
                            className={styles.button}
                            disabled={isLoading}
                            onClick={(e) =>
                                dispatch(deleteCommentRequest(item))
                            }
                        >
                            Удалить
                        </Button>
                    )}
                    <Button className={styles.button} disabled={isLoading}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CommentForm;
