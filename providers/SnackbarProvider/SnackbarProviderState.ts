import { SnackbarProviderActionType } from "./SnackbarProviderAction";

export interface SnackbarProviderState {
  type: SnackbarProviderActionType;
  open: boolean;
  variant: "info" | "error" | "success";
  message: string;
}

export const snackbarProviderInitialState: SnackbarProviderState = {
  type: SnackbarProviderActionType.CLOSE,
  open: false,
  variant: "info",
  message: "",
};
