import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import Blogs from '../pages/Posts';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';
import AuthRoot from '../pages/AuthRoot';
import Profile from '../pages/Profile';
import CreatePost from '../pages/CreatePost';
import ViewPost from '../pages/ViewPost';

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
        path: LinkPath.Posts,
        element: <Blogs pageTitle={PageTitle.Posts} />,
      },
      {
        path: LinkPath.Profile,
        element: <Profile pageTitle={PageTitle.Profile} />,
      },
      {
        path: LinkPath.CreatePost,
        element: <CreatePost pageTitle={PageTitle.CreatePost} />,
      },
      {
        path: LinkPath.ViewPost,
        element: <ViewPost />,
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
