enum LinkPath {
  Home = '/',
  Posts = '/posts',
  Login = '/login',
  Register = '/register',
  ForgotPassword = '/forgot-password',
  CreatePost = '/create-post',
  Profile = '/profile/:authorName',
  Followers = 'followers',
  Following = 'following',
  ViewPost = '/post/:postId',
  EditPost = '/post/:postId/edit',
  Settings = '/settings',
}

export default LinkPath;
