import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AdminLayout, BrigadierLayout } from 'common/layouts';
import { Auth } from 'features/authentication';
import { Dashboard } from 'features/dashboard';
import { Directories } from 'features/directories';
import { Reports } from 'features/reports';
import { Settings } from 'features/settings';
import { isAuth } from 'features/authentication/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from 'features/authentication/actions';

/*
    проверяем авторизацию
    в зависимости от роли рендерим layout
*/

export const Router = () => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logOut());
    };
    return (
        <Routes>
            <Route
                path='/login'
                element={
                    <RequireUnAuth>
                        <Auth />
                    </RequireUnAuth>
                }
            />
            <Route
                element={
                    <RequireAuth>
                        <AdminLayout logout={logout} />
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
    const auth = useSelector(isAuth);
    if (!auth) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    } else {
        return children;
    }
};

const RequireUnAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    const auth = useSelector(isAuth);
    if (auth) {
        return <Navigate to='/' state={{ from: location }} replace />;
    } else {
        return children;
    }
};
