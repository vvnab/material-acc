import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AdminLayout, BrigadierLayout } from 'common/layouts';
import { Auth } from 'features/authentication';
import { Dashboard } from 'features/dashboard';
import { Directories } from 'features/directories';
import { Reports } from 'features/reports';
import { Settings } from 'features/settings';

/*
    проверяем авторизацию
    в зависимости от роли рендерим layout
*/

export const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<Auth />} />
            <Route
                element={
                    <RequireAuth>
                        <AdminLayout />
                    </RequireAuth>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path='/directories' element={<Directories />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/settings' element={<Settings />} />
            </Route>
            <Route
                element={
                    <RequireAuth>
                        <BrigadierLayout />
                    </RequireAuth>
                }
            ></Route>
        </Routes>
    );
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    if (true) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    } else {
        return children;
    }
};
