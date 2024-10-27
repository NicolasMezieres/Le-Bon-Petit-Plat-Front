import * as yup from "yup";
export const schemaUpdateMyInfo = yup.object({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  email: yup.string().optional().email("Email invalide"),
  username: yup.string().optional().min(3, "Doit contenir au moin 3 caractères"),
});
