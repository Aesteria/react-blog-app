import React, { useEffect } from 'react';
import Container from '../../layouts/Container/Container';

type PageProps = { children: React.ReactNode; title: string; wide?: boolean };

const Page = ({ wide, title, children }: PageProps) => {
  useEffect(() => {
    document.title = `${title} | ComplexApp`;
    window.scrollTo(0, 0);
  }, [title]);

  return <Container wide={wide}>{children}</Container>;
};

export default Page;
