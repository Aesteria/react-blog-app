import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, HTMLInputTypeAttribute } from 'react';
import { FieldErrorsImpl, Path, UseFormRegister } from 'react-hook-form';
import { AuthFormValues } from '../types/form';

type InputGroupProps = {
  type?: HTMLInputTypeAttribute;
  label: string;
  Icon?: (
    props: ComponentPropsWithoutRef<'svg'> & {
      title?: string;
      titleId?: string;
    }
  ) => JSX.Element;
  className?: string;
  register: UseFormRegister<AuthFormValues>;
  required?: boolean;
  name: Path<AuthFormValues>;
  maxLength?: number;
  minLength?: number;
  errors: Partial<FieldErrorsImpl<AuthFormValues>>;
};

export default function InputGroup({
  label,
  register,
  required,
  Icon,
  className,
  type = 'text',
  name,
  maxLength,
  minLength,
  errors,
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
          id={name}
          className={clsx(
            'block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            Icon && 'pl-10',
            errors[name] &&
              'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
          )}
          {...register(name, { required, maxLength, minLength })}
        />
        {errors[name] && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
}
