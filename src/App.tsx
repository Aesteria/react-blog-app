import { RouterProvider } from 'react-router-dom';

import router from './router';
import { useAppSelector } from './store/hooks';
import { selectAuthStateChange } from './store/userSlice';

export default function App() {
  const authStatus = useAppSelector(selectAuthStateChange);

  if (authStatus === 'pending') {
    return null;
  }

  return <RouterProvider router={router} />;
}
