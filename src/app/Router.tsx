import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AdminLayout, BrigadierLayout } from 'common/layouts';
import { Auth } from 'features/authentication';
import { Dashboard } from 'features/admin/dashboard';
import { Directories } from 'features/directories';
import { Reports } from 'features/admin/reports';
import { Settings } from 'features/admin/settings';
import {
    WarehousesMenu,
    Flows,
    Warehouses,
    Brigades,
} from 'features/admin/stock';
import { isAuth, selectProfile } from 'features/authentication/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from 'features/authentication/actions';

/*
    проверяем авторизацию
    в зависимости от роли рендерим layout
*/

export const Router = () => {
    const { role } = useSelector(selectProfile);
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
            {role === 'ROLE_ADMIN' ? (
                <Route
                    element={
                        <RequireAuth>
                            <AdminLayout logout={logout} />
                        </RequireAuth>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path='/directories' element={<Directories />} />
                    <Route path='/stock' element={<WarehousesMenu />}>
                        <Route path='' element={<Flows />} />
                        <Route path='warehouses' element={<Warehouses />} />
                        <Route path='brigades' element={<Brigades />} />
                    </Route>
                    <Route path='/reports' element={<Reports />} />
                    <Route path='/settings' element={<Settings />} />
                </Route>
            ) : (
                <Route
                    element={
                        <RequireAuth>
                            <BrigadierLayout logout={logout} />
                        </RequireAuth>
                    }
                >
                    <Route index element={<></>} />
                </Route>
            )}
            <Route path='*' element={<Navigate to='/' replace />} />
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
