import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export type UseSelectValue = [
  value: string,
  handleChange: (evt: SelectChangeEvent<string>) => void,
  handleBlur: () => void,
  isValid: (updatedErrorMessage?: boolean) => boolean,
  error: string
];

export default function useSelectInput(
  initialVal: string,
  validator: (value: string) => string
): UseSelectValue {
  const [value, setValue] = useState(initialVal);
  const [error, setError] = useState("");

  const handleChange = (evt: SelectChangeEvent<string>) => {
    if (error) {
      setError(validator(evt.target.value));
    }
    setValue(evt.target.value);
  };

  const handleBlur = () => {
    setError(validator(value));
  };

  const isValid = (updatedErrorMessage = true) => {
    const errMsg = validator(value);
    if (updatedErrorMessage) setError(errMsg);
    return errMsg === "";
  };

  return [value, handleChange, handleBlur, isValid, error];
}
