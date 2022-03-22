import * as yup from "yup";

export const validationBalloonSchema = yup.object({
  name: yup
    .string()
    .trim()
    .max(25, "Name should be of maximum 25 characters length")
    .required("Name is required"),
  description: yup
    .string()
    .trim()
    .max(150, "Description should be of maximum 150 characters length")
    .required("Description is required"),
  type: yup.string().required("Type is required"),
  color: yup.string().required("Color is required"),
  latitude: yup
    .number()
    .typeError("Longitude must be a number")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: yup
    .number()
    .typeError("Longitude must be a number")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});
