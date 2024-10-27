import { tokenType } from "@/utils/type";
import { createContext, Dispatch, SetStateAction } from "react";
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
  tokenInfo?: tokenType | undefined;
  setTokenInfo?: Dispatch<SetStateAction<tokenType | undefined>>;
};
export const ContextLoading = createContext<loading>({
  isLoading: false,
  setIsLoading: () => {},
  tokenInfo: undefined,
  setTokenInfo: () => {},
});
