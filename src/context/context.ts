import { createContext } from "react";
export type reloadNeeded = {
  isReloadNeeded: boolean;
  setIsReloadNeeded: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ContextReloadNeeded = createContext<reloadNeeded>({
  isReloadNeeded: false,
  setIsReloadNeeded: () => {},
});
export type loading = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ContextLoading = createContext<loading>({
  isLoading: false,
  setIsLoading: () => {},
});
