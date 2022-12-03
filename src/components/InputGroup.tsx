import clsx from 'clsx';
import { ComponentPropsWithoutRef, HTMLInputTypeAttribute } from 'react';

type InputGroupProps = {
  name: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  className?: string;
  Icon?: (
    props: ComponentPropsWithoutRef<'svg'> & {
      title?: string;
      titleId?: string;
    }
  ) => JSX.Element;
  onChange: (value: string) => void;
  value: string;
};

export default function InputGroup({
  name,
  type = 'text',
  label,
  className,
  onChange,
  value,
  Icon,
}: InputGroupProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          className={clsx(
            'block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            Icon && 'pl-10'
          )}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>
    </div>
  );
}
