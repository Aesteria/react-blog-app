import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import Blogs from '../pages/Blogs';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';
import AuthRoot from '../pages/AuthRoot';
import Profile from '../pages/Profile';
import CreatePost from '../pages/CreatePost';

const router = createBrowserRouter([
  {
    path: LinkPath.Home,
    element: <Root />,
    children: [
      {
        path: LinkPath.Home,
        element: <Home pageTitle={PageTitle.Home} />,
      },
      {
        path: LinkPath.Blogs,
        element: <Blogs pageTitle={PageTitle.Blogs} />,
      },
      {
        path: LinkPath.Profile,
        element: <Profile pageTitle={PageTitle.Profile} />,
      },
      {
        path: LinkPath.CreatePost,
        element: <CreatePost pageTitle={PageTitle.CreatePost} />,
      },
    ],
  },
  {
    path: LinkPath.Home,
    element: <AuthRoot />,
    children: [
      {
        path: LinkPath.Login,
        element: <Login pageTitle={PageTitle.Login} />,
      },
      {
        path: LinkPath.Register,
        element: <Register pageTitle={PageTitle.Register} />,
      },
      {
        path: LinkPath.ForgotPassword,
        element: <ForgotPassword pageTitle={PageTitle.ForgotPassword} />,
      },
    ],
  },
]);

export default router;
