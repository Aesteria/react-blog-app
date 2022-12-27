import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Loading from './components/ui/Loading';
import { useAppSelector } from './store/hooks';
import { selectAuthStateChange } from './store/authSlice';
import AppRouter from './router/AppRouter';

export default function App() {
  const authStatus = useAppSelector(selectAuthStateChange);

  if (authStatus === 'pending') {
    return (
      <div className="bg-slate-600 fixed inset-0 flex justify-center items-center">
        <Loading className="stroke-teal-200" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <AppRouter />
    </>
  );
}
