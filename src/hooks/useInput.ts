import { ChangeEvent, useState } from 'react';

export const useInput = (
  inputFieldName: string,
  validateFn: (value: string) => boolean,
  defaultValue?: string
) => {
  const [value, setValue] = useState(defaultValue || '');

  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState('');

  const valueIsValid = validateFn(value);
  const valueHasErrors = !valueIsValid && isTouched;

  const valueChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
    setIsTouched(true);

    if (!validateFn(event.target.value)) {
      setError(`You must provide a ${inputFieldName}`);
    }
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
    if (!valueIsValid) setError(`You must provide a ${inputFieldName}`);
  };

  return {
    value,
    error,
    valueHasErrors,
    valueChangeHandler,
    valueBlurHandler,
    valueIsValid,
    setValue,
  };
};
