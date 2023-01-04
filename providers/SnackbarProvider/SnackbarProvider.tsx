import React, {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
} from "react";
import {
  SnackbarProviderAction,
  SnackbarProviderActionType,
} from "./SnackbarProviderAction";
import {
  snackbarProviderInitialState,
  SnackbarProviderState,
} from "./SnackbarProviderState";

interface SnackbarContext {
  snackbarState: SnackbarProviderState;
  dispatchSnackbar: Dispatch<SnackbarProviderAction>;
}
export const SnackbarContext = createContext<SnackbarContext>({
  snackbarState: snackbarProviderInitialState,
} as SnackbarContext);

const reducer: Reducer<SnackbarProviderState, SnackbarProviderAction> = (
  state,
  action
) => {
  switch (action.type) {
    case SnackbarProviderActionType.CLOSE:
      return {
        ...snackbarProviderInitialState,
      };
    case SnackbarProviderActionType.OPEN:
      return {
        type: SnackbarProviderActionType.OPEN,
        open: true,
        variant: action.variant,
        message: action.message,
      };
    default:
      throw new Error("Snackbar Action Type Not Accepted");
  }
};

export const SnackbarProvider = ({ children }) => {
  const [snackbarState, dispatchSnackbar] = useReducer(
    reducer,
    snackbarProviderInitialState
  );

  return (
    <SnackbarContext.Provider
      value={{
        snackbarState,
        dispatchSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
