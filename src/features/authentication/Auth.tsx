import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from './actions';
import { isLoading } from './selectors';
import Input from 'common/components/Input';
import Button from 'common/components/Button';

import styles from './Auth.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Auth: React.FC<Props> = ({ ...rest }) => {
    const dispatch = useDispatch();
    const loading: boolean = useSelector(isLoading);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
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
                    />
                    <Input
                        name='password'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder='Пароль'
                        type='password'
                    />
                    <Button type='submit' disabled={loading}>
                        Войти
                    </Button>
                </fieldset>
            </form>

            <footer>
                ДК &laquo;НОРД&raquo; {new Date().getFullYear()} &copy;
            </footer>
        </div>
    );
};

export default Auth;
