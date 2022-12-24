import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';

export default function AuthRoot() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
