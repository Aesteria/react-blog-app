import clsx from 'clsx';
import { ReactNode } from 'react';

type ContainerProps = {
  className?: string;
  children: ReactNode;
  size?: 'narrow' | 'default' | 'wide';
};

export default function Container({
  className,
  children,
  size = 'default',
}: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto px-4 sm:px-6 lg:px-8',
        size === 'default' && 'max-w-7xl',
        size === 'narrow' && 'max-w-5xl',
        size === 'wide' && 'max-w-screen-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}
