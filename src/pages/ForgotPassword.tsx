import { useEffect } from 'react';
import PageTitle from '../constants/pageTitle';

type ForgotPasswordProps = {
  pageTitle: PageTitle.ForgotPassword;
};

export default function ForgotPassword({ pageTitle }: ForgotPasswordProps) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return <div>ForgotPassword</div>;
}
