import * as yup from "yup";

export const formSchema = {
  schema: yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  }),
  defaultValues: {
    email: "",
    password: "",
  },
};
