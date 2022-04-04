import { Routes, Route } from 'react-router-dom';
import Auth from 'features/authentication/Auth';

/*
    проверяем авторизацию
    в зависимости от роли рендерим layout
*/

export const Router = () => (
    <Routes>
        <Route index element={<Auth />} />
    </Routes>
);
