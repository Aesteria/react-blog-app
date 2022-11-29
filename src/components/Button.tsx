import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ReactNode } from 'react';

// PREV STYLES: flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg

type Variants = 'solid' | 'outline';
type Colors = 'indigo';
type BaseStyles = Record<Variants, string>;
type VariantStyles = Record<Variants, Record<Colors, string>>;

const baseStyles: BaseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none',
};

const variantStyles: VariantStyles = {
  solid: {
    indigo:
      'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-indigo-600',
  },
  outline: {
    indigo:
      'ring-indigo-200 text-slate-700 hover:text-indigo-900 hover:ring-indigo-300 active:bg-indigo-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-indigo-300',
  },
};

type ButtonProps = {
  variant?: Variants;
  color?: Colors;
  className?: string;
  to?: string;
  children: ReactNode;
};

export default function Button({
  variant = 'solid',
  color = 'indigo',
  className,
  children,
  to,
}: ButtonProps) {
  const buttonClass = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  return to ? (
    <Link to={to} className={buttonClass}>
      {children}
    </Link>
  ) : (
    <button className={buttonClass}>{children}</button>
  );
}
