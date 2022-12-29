import React from "react";
import { StyleSheet } from "react-native";
import {
  MD2Colors,
  MD3LightTheme,
  Snackbar,
  SnackbarProps,
} from "react-native-paper";

interface Props extends Omit<SnackbarProps, "theme"> {
  variant: "error" | "success";
}
const MySnackbar = (props: Props) => {
  const { variant, children } = props;

  return (
    <Snackbar
      wrapperStyle={styles.snackbarWrapper}
      style={{
        backgroundColor:
          variant === "error" ? MD3LightTheme.colors.error : MD2Colors.green500,
      }}
      action={{
        label: "OK",
        textColor: "#FFF",
      }}
      {...props}
    >
      {children}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbarWrapper: {
    position: "absolute",
    marginHorizontal: 32,
    width: "100%",
  },
});

export default MySnackbar;
