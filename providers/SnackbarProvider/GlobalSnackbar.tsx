import * as React from "react";
import { useEffect, useState } from "react";
import {
  MD2Colors,
  MD3Colors,
  Snackbar,
  SnackbarProps,
  Text,
} from "react-native-paper";
import { useSnackbar } from "./SnackbarProvider";
import { SnackbarProviderActionType } from "./SnackbarProviderAction";
import { snackbarProviderInitialState } from "./SnackbarProviderState";

const defaultStyle: SnackbarProps["style"] = {
  backgroundColor: MD2Colors.white,
};

const defaultActionLabelStyle: SnackbarProps["action"]["labelStyle"] = {
  color: MD2Colors.black,
};

const GlobalSnackBar = () => {
  const { snackbarState, dispatchSnackbar } = useSnackbar();
  const [snackbarSyle, setSnackbarStyle] = useState(defaultStyle);
  const [snackbarLabelStyle, setSnackbarLabelStyle] = useState(
    defaultActionLabelStyle
  );

  useEffect(() => {
    switch (snackbarState.variant) {
      case "info":
        setSnackbarStyle(defaultStyle);
        setSnackbarLabelStyle(defaultActionLabelStyle);
        break;
      case "error":
        setSnackbarStyle({
          backgroundColor: MD3Colors.error50,
        });
        setSnackbarLabelStyle({
          color: MD2Colors.white,
        });
        break;
      case "success":
        setSnackbarStyle({
          backgroundColor: MD2Colors.green500,
        });
        setSnackbarLabelStyle({
          color: MD2Colors.white,
        });
        break;
      default:
        setSnackbarStyle(defaultStyle);
        setSnackbarLabelStyle(defaultActionLabelStyle);
        break;
    }
  }, [snackbarState]);

  const closeMe = () => {
    dispatchSnackbar({
      ...snackbarProviderInitialState,
      type: SnackbarProviderActionType.CLOSE,
    });
  };

  return (
    <>
      {typeof snackbarState.open === "boolean" && (
        <Snackbar
          style={snackbarSyle}
          visible={snackbarState.open}
          onDismiss={closeMe}
          action={{
            label: "Ok",
            labelStyle: snackbarLabelStyle,
          }}
        >
          <Text style={snackbarLabelStyle}>{snackbarState.message}</Text>
        </Snackbar>
      )}
    </>
  );
};

export default GlobalSnackBar;
