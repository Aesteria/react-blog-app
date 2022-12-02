import { useEffect } from 'react';
import PageTitle from '../constants/pageTitle';

type RegisterProps = {
  pageTitle: PageTitle.Register;
};

export default function Register({ pageTitle }: RegisterProps) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return <div>Register</div>;
}
