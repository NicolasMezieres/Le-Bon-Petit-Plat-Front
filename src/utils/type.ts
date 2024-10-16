export type signUpFormType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
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
  isARobot: boolean;
};
export type signInType = {
  identifier: string;
  password: string;
};

export type commentaryFormType = {
  idRecipe: string;
  note: number;
  text: string;
};

export type recipeType = {
  title: string;
  picture: string;
  idCategory: string;
  piece: number;
  preparationTime: string;
  cookingTime?: string;
  standingTime?: string;
  difficulty: number;
  ingredient: [
    {
      quantity: number;
      unit: string;
      ingredient: string;
    }
  ];
  cookingStep: [
    {
      step: string;
    }
  ];
};
export type updateUserByAdminType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  isActive: boolean;
};
