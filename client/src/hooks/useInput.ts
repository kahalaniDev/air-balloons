import { useState } from "react";

export type UseInputValue = [
  value: string,
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  handleBlur: () => void,
  isValid: (updatedErrorMessage?: boolean) => boolean,
  error: string,
  reset: () => void,
  setError: (value: React.SetStateAction<string>) => void
];

export default function useInput(
  initialVal: string,
  validator: (value: string) => string
): UseInputValue {
  const [value, setValue] = useState(initialVal);
  const [error, setError] = useState("");

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(validator(evt.currentTarget.value));
    }
    setValue(evt.currentTarget.value);
  };

  const handleBlur = () => {
    setError(validator(value));
  };

  const reset = () => {
    setValue(initialVal);
  };

  const isValid = (updatedErrorMessage = true) => {
    const errMsg = validator(value);
    if (updatedErrorMessage) setError(errMsg);
    return errMsg === "";
  };

  return [value, handleChange, handleBlur, isValid, error, reset, setError];
}
