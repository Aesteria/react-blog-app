enum LinkPath {
  Home = '/',
  Posts = '/posts',
  Login = '/login',
  Register = '/register',
  ForgotPassword = '/forgot-password',
  CreatePost = '/create-post',
  Profile = '/profile/:userId',
  ViewPost = '/post/:postId',
  EditPost = '/post/:postId/edit',
  Settings = '/settings',
}

export default LinkPath;
