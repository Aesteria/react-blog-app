import clsx from 'clsx';
import { ReactNode } from 'react';

type HeadingSecondaryProps = {
  children: ReactNode;
  color?: 'white' | 'black';
  className?: string;
};

export default function HeadingSecondary({
  children,
  color = 'black',
  className,
}: HeadingSecondaryProps) {
  return (
    <h2
      className={clsx(
        'text-4xl sm:text-5xl font-medium tracking-tight',
        color === 'white' && 'text-white',
        color === 'black' && 'text-gray-900',
        className
      )}
    >
      {children}
    </h2>
  );
}
