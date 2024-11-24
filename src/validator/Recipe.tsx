import * as yup from "yup";
export const schemaRecipe = yup.object({
  title: yup.string().required("Ce champ est requis"),
  picture: yup.string().required("Ce champ est requis"),
  nameCategory: yup.string().required("Ce champ est requis"),
  piece: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1, "Minimum 1")
    .max(50, "Maximum 50")
    .required("Ce champ est requis"),
  preparationTime: yup.string().required("Ce champ est requis"),
  difficulty: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1, "Difficulté invalide")
    .max(3, "Difficulté invalide")
    .required("Ce champ est requis"),
  ingredient: yup
    .array()
    .of(
      yup.object().shape({
        quantity: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .min(0, "Minimum 0")
          .max(1000, "Maximum 1000")
          .required("Ce champ est requis"),
        unit: yup.string().required("Ce champ est requis"),
        ingredient: yup.string().required("Ce champ est requis"),
      })
    )
    .required("Minimum 1 ingrédient")
    .min(1, "Minimum 1 ingrédient"),
  cookingStep: yup
    .array()
    .of(
      yup.object().shape({
        step: yup
          .string()
          .min(3, "Nécessite au moins 3 caractères")
          .max(256, "Caractères maximum atteints")
          .required("Ce champ est requis"),
      })
    )
    .required("Minimum 1 étape")
    .min(1, "Minimum 1 étape"),
});
