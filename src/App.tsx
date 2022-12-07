import { RouterProvider } from 'react-router-dom';

import router from './router';
import { useAppSelector } from './store/hooks';
import { selectAuthStatus } from './store/userSlice';

export default function App() {
  const isAuth = useAppSelector(selectAuthStatus);

  if (isAuth === 'pending') {
    return null;
  }

  return <RouterProvider router={router} />;
}
