import * as yup from "yup";
export const schemaSignup = yup.object({
  firstName: yup.string().required("Ce champ est requis"),
  lastName: yup.string().required("Ce champ est requis"),
  email: yup.string().required("Ce champ est requis").email("Email invalide"),
  username: yup
    .string()
    .required("Ce champ est requis")
    .min(3, "Doit contenir au moin 3 caractères"),
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
  checkbox: yup
    .boolean()
    .oneOf([true], "Accepter les termes et les conditions")
    .required("Ce champ est requis"),
});
