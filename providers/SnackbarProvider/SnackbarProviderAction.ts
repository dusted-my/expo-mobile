import { SnackbarProviderState } from "./SnackbarProviderState";

export enum SnackbarProviderActionType {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

export interface SnackbarProviderAction
  extends Omit<SnackbarProviderState, "open"> {}
