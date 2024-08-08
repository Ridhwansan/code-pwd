import * as Yup from "yup";

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
});
