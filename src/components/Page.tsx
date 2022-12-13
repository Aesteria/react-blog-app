import { useEffect } from 'react';
import PageTitle from '../constants/pageTitle';

type PageProps = {
  children: JSX.Element;
  title: PageTitle;
};

export default function Page({ children, title }: PageProps) {
  useEffect(() => {
    document.title = `${title} | AesteBlog`;
  }, [title]);

  return children;
}
