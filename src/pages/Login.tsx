import { useEffect } from 'react';
import PageTitle from '../constants/pageTitle';

type LoginProps = {
  pageTitle: PageTitle.Login;
};

export default function Login({ pageTitle }: LoginProps) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return <div>Login</div>;
}
