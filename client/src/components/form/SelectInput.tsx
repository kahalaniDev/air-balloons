import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

type Props = {
  label: string;
  items: string[];
  error?: boolean;
  errorText?: string | false;
  selectInputProps: SelectProps<string>;
  disabled?: boolean;
};

const SelectInput: React.FC<Props> = ({
  label,
  items,
  error,
  errorText,
  selectInputProps,
  disabled,
}) => {
  const labelId = `${label.toLowerCase()}-select-label`;

  return (
    <FormControl
      variant="standard"
      sx={{ minWidth: 120, width: "100%" }}
      error={error ? true : false}
      disabled={disabled}
    >
      <InputLabel id={labelId} sx={{ textTransform: "capitalize" }}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        label="color"
        {...selectInputProps}
        disabled={disabled}
      >
        {items.map((item) => (
          <MenuItem
            key={item}
            value={item.toLowerCase()}
            sx={{ textTransform: "capitalize" }}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;
