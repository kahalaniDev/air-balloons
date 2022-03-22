import { GridProps, TextFieldProps } from "@mui/material";
import { BalloonColor, BalloonType } from "../models/enums";

export type BalloonTextFieldProps = {
  type: "TextField";
  name: "name" | "description" | "latitude" | "longitude";
  gridProps: GridProps;
  textFieldProps: TextFieldProps;
};

export type BalloonSelectInputProps = {
  type: "SelectInput";
  name: "type" | "color";
  gridProps: GridProps;
  items: string[];
};

export const balloonInputArr: (
  | BalloonTextFieldProps
  | BalloonSelectInputProps
)[] = [
  {
    type: "TextField",
    name: "name",
    gridProps: { xs: 12 },
    textFieldProps: { fullWidth: true, autoFocus: true },
  },
  {
    type: "TextField",
    name: "description",
    gridProps: { xs: 12 },
    textFieldProps: { fullWidth: true },
  },
  {
    type: "SelectInput",
    name: "type",
    gridProps: { xs: 6 },
    items: Object.keys(BalloonType),
  },
  {
    type: "SelectInput",
    name: "color",
    gridProps: { xs: 6 },
    items: Object.keys(BalloonColor),
  },
  {
    type: "TextField",
    name: "longitude",
    gridProps: { xs: 6 },
    textFieldProps: {},
  },
  {
    type: "TextField",
    name: "latitude",
    gridProps: { xs: 6 },
    textFieldProps: {},
  },
];
