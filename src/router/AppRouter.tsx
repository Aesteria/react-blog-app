import { Route, Routes } from 'react-router-dom';
import Root from '../pages/Root';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';
import AuthRoot from '../pages/AuthRoot';
import Settings from '../pages/Settings';
import CreatePost from '../pages/CreatePost';
import ViewPost from '../pages/ViewPost';
import EditPost from '../pages/EditPost';
import Profile from '../pages/Profile/Profile';
import Followers from '../pages/Profile/Followers';
import Following from '../pages/Profile/Following';
import PostsFeed from '../pages/Profile/PostsFeed';
import NotFound from '../pages/NotFound';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route
          path={LinkPath.Home}
          element={<Home pageTitle={PageTitle.Home} />}
        />
        <Route
          path={LinkPath.Settings}
          element={<Settings pageTitle={PageTitle.Settings} />}
        />

        <Route
          path={LinkPath.Profile}
          element={<Profile pageTitle={PageTitle.Profile} />}
        >
          <Route path="" element={<PostsFeed />} />
          <Route path={LinkPath.Followers} element={<Followers />} />
          <Route path={LinkPath.Following} element={<Following />} />
        </Route>

        <Route
          path={LinkPath.CreatePost}
          element={<CreatePost pageTitle={PageTitle.CreatePost} />}
        />
        <Route
          path={LinkPath.ViewPost}
          element={<ViewPost pageTitle={PageTitle.ViewPost} />}
        />
        <Route
          path={LinkPath.EditPost}
          element={<EditPost pageTitle={PageTitle.EditPost} />}
        />
      </Route>

      <Route path="/" element={<AuthRoot />}>
        <Route
          path={LinkPath.Login}
          element={<Login pageTitle={PageTitle.Login} />}
        />
        <Route
          path={LinkPath.Register}
          element={<Register pageTitle={PageTitle.Register} />}
        />
        <Route
          path={LinkPath.ForgotPassword}
          element={<ForgotPassword pageTitle={PageTitle.ForgotPassword} />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
