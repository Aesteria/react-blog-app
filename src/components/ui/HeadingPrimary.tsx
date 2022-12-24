import clsx from 'clsx';
import { ReactNode } from 'react';

type HeadingPrimaryProps = {
  children: ReactNode;
  color?: 'white' | 'black';
  className?: string;
};

export default function HeadingPrimary({
  children,
  color = 'black',
  className,
}: HeadingPrimaryProps) {
  return (
    <h1
      className={clsx(
        'text-4xl sm:text-6xl font-medium tracking-tight',
        color === 'white' && 'text-white',
        color === 'black' && 'text-gray-900',
        className
      )}
    >
      {children}
    </h1>
  );
}
