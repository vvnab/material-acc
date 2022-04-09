import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from './actions';
import { selectLoading, selectError } from './selectors';
import { Input, Button, Error } from 'common/components';

import styles from './Auth.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Auth: React.FC<Props> = ({ ...rest }) => {
    const dispatch = useDispatch();
    const loading: boolean = useSelector(selectLoading);
    const errorMessage: string = useSelector(selectError);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: ({ username, password }) => {
            let errors: any = {};

            if (!username) {
                errors.username = 'Поле не должно быть пустым';
            }
            if (!password) {
                errors.password = 'Поле не должно быть пустым';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(loginRequest(values));
        },
    });
    return (
        <div {...rest} className={styles.wrap}>
            <h1>ДК &laquo;НОРД&raquo;</h1>

            <form onSubmit={formik.handleSubmit}>
                <fieldset className={styles.form}>
                    <legend>Вход в систему</legend>
                    <Input
                        name='username'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder='Ваше имя'
                        type='text'
                        error={formik.errors.username}
                    />
                    <Input
                        name='password'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder='Пароль'
                        type='password'
                        error={formik.errors.password}
                    />
                    <Button type='submit' disabled={loading}>
                        Войти
                    </Button>
                </fieldset>
            </form>

            {errorMessage && <Error> {errorMessage}</Error>}

            <footer>
                ДК &laquo;НОРД&raquo; {new Date().getFullYear()} &copy;
            </footer>
        </div>
    );
};

export default Auth;
