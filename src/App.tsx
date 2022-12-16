import { RouterProvider } from 'react-router-dom';
import Loading from './components/ui/Loading';
import RequestStatus from './constants/requestStatus';

import router from './router';
import { useAppSelector } from './store/hooks';
import { selectAuthStateChange } from './store/users/userSlice';

export default function App() {
  const authStatus = useAppSelector(selectAuthStateChange);
  const postsStatus = useAppSelector((state) => state.posts.status);

  if (authStatus === 'pending' || postsStatus === RequestStatus.Pending) {
    return (
      <div className="bg-slate-600 fixed inset-0 flex justify-center items-center">
        <Loading className="stroke-teal-200" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
