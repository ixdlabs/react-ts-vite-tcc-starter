import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import { Layout } from '@/components/layout';
import { Home } from '@/pages/home';
import { Login } from '@/pages/login';
import { useAuth } from '@/state/auth';

function AuthRoute() {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

function NonAuthRoute() {
  const { isAuth } = useAuth();

  return !isAuth ? <Outlet /> : <Navigate to="/" />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NonAuthRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="" element={<Navigate to="/home" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRoutes };
