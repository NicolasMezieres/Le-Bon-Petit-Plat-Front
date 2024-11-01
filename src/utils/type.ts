export type signUpFormType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  checkbox: boolean;
};
export type signUpType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};
export type signInFormType = {
  identifier: string;
  password: string;
};
export type signInType = {
  identifier: string;
  password: string;
};
export type resetPasswordType = { password: string; confirmPassword: string };
export type tokenType = {
  exp: number;
  iat: number;
  role: string;
  sub: string;
};
export type commentaryFormType = {
  idRecipe: string;
  note: number;
  text?: string;
};

export type recipeType = {
  title: string;
  picture: string;
  nameCategory: string;
  piece: number;
  preparationTime: string;
  cookingTime?: string;
  standingTime?: string;
  difficulty: number;
  ingredient: {
    quantity: number;
    unit: string;
    ingredient: string;
  }[];
  cookingStep: {
    step: string;
  }[];
};
export type updateUserByAdminType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  isActive: boolean;
};
export type userInfoType = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};
export type updateMyInfoType = {
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
};
export type userListType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  isActive: boolean;
  favoriteRecipe: string[];
};
export type recipeFormType = {
  title: string;
  picture: string;
  nameCategory: string;
  piece: number;
  preparationTime: string;
  cookingTime?: string;
  standingTime?: string;
  difficulty: number;
  ingredient: { quantity: number; unit: string; ingredient: string }[];
  cookingStep: { step: string }[];
  file?: FileList;
};
export type ingredientFormType = {
  quantity: number;
  unit: string;
  ingredient: string;
};
export type categoryType = {
  id: string;
  name: string;
};

export type lookRecipeType = {
  id: string;
  title: string;
  picture: string;
  idCategory: string;
  piece: number;
  preparationTime: string;
  cookingTime?: string;
  standingTime?: string;
  difficulty: number;
  ingredient: {
    quantity: number;
    unit: string;
    ingredient: string;
  }[];
  cookingStep: {
    step: string;
  }[];
  category: { name: string };
  createdAt: string;
  idUser: string;
  note: string;
  numberNote: number;
  sumNote: number;
  updatedAt: string;
};

export type commentaryType = {
  createdAt: string;
  idRecipe: string;
  idUser: string;
  isVisible: boolean;
  note: number;
  text: string;
  updatedAt: string;
  username: string;
  _id: string;
};
