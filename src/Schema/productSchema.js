import * as Yup from "yup";
export const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Pasword must be 8 or more characters")
    .required("This field is required"),
});
