import React from 'react';

type ContainerProps = { children: React.ReactNode; wide?: boolean };

const Container = ({ children, wide }: ContainerProps) => {
  let classNames = 'container py-md-5';
  if (!wide) {
    classNames += ' container--narrow';
  }

  return <div className={classNames}>{children}</div>;
};

export default Container;
