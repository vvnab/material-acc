import React from 'react';

import Input from 'common/components/Input';
import Button from 'common/components/Button';

import styles from './Auth.module.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {}

const Auth: React.FC<Props> = ({ ...rest }) => {
    return (
        <div {...rest} className={styles.wrap}>
            <h1>ДК НОРД</h1>

            <form action=''>
                <fieldset className={styles.form}>
                    <legend>Вход в систему</legend>
                    <Input placeholder='Ваше имя' type='text' />
                    <Input placeholder='Пароль' type='password' />
                    <Button>Войти</Button>
                </fieldset>
            </form>

            <footer>{new Date().getFullYear()} &copy;</footer>
        </div>
    );
};

export default Auth;
