import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
