import * as yup from "yup";
export const schemaRequestResetPassword = yup.object({
  email: yup.string().required("Ce champ est requis").email("Email invalide"),
});
