'use client';
import { useState } from 'react';

function useInput(defaultValue: any = '', validate: (_: any) => boolean) {
  const [value, setValue] = useState<any>(defaultValue);
  const [error, setError] = useState<any>(null);
  const [touched, setTouched] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    setTouched(true);
    setError(null); // Optional: clear error on typing
  };

  const onBlur = () => {
    let validationResult = null;

    if (typeof validate === 'function') {
      validationResult = validate(value);
      setError(!validationResult);
    }
  };

  const reset = () => {
    setValue(defaultValue);
    setError(null);
    setTouched(false);
  };

  return {
    value,
    onChange,
    onBlur,
    hasErrors: Boolean(error),
    error,
    touched,
    setValue,
    reset,
  };
}

export default useInput;
