import { useEffect } from 'react';
import PageTitle from '../constants/pageTitle';

type PageProps = {
  children: React.ReactNode;
  title: PageTitle;
};

export default function Page({ children, title }: PageProps) {
  useEffect(() => {
    document.title = `${title} | AesteBlog`;
    window.scrollTo(0, 0);
  }, [title]);

  return <main>{children}</main>;
}
