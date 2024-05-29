import { Outlet } from 'react-router-dom';
import { HeaderComponent } from '../header/header';

export const Layout = () => {
  return (
    <div data-testid='outlet'>
      <HeaderComponent />
      <Outlet />
    </div>
  );
};
