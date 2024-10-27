import * as yup from "yup";
export const schemaIngredient = yup.object({
  quantity: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, "Minimum 0")
    .max(1000, "Maximum 1000")
    .required("Minimum 1"),
  unit: yup
    .string()
    .transform((value) => (value ? value : null))
    .required("Choisir une unité"),
  ingredient: yup.string().required("Entrer un ingrédient"),
});
