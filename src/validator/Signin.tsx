import * as yup from "yup";
export const schemaSignin = yup.object({
  identifier: yup.string().required("Ce champ est requis"),
  password: yup
    .string()
    .required("Ce champ est requis")
    .matches(/[a-z]/, "Nécessite d'une minuscule")
    .matches(/[A-Z]/, "Nécessite d'une majuscule")
    .matches(/[0-9]/, "Nécessite d'un nombre")
    .matches(/[@!?]/, "Nécessite charactère spécial")
    .min(8, "Minimum 8 character"),
});
