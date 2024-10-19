import * as yup from "yup";
export const schemaResetPassword = yup.object({
  password: yup
    .string()
    .required("Ce champ est requis")
    .matches(/[a-z]/, "Nécessite d'une minuscule")
    .matches(/[A-Z]/, "Nécessite d'une majuscule")
    .matches(/[0-9]/, "Nécessite d'un nombre")
    .matches(/[@!?]/, "Nécessite charactère spécial")
    .min(8, "Minimum 8 character"),
  confirmPassword: yup
    .string()
    .required("Ce champ est requis")
    .oneOf([yup.ref("password")], "Le mot de passe n'est pas identique"),
});
