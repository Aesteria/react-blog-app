import { RouterProvider } from 'react-router-dom';

import router from './router';
import { useAppSelector } from './store/hooks';
import { selectCurrentUserStatus } from './store/userSlice';

export default function App() {
  const status = useAppSelector(selectCurrentUserStatus);

  if (status === 'pending') {
    return null;
  }

  return <RouterProvider router={router} />;
}
