import { useNavigation } from "@react-navigation/native";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { Formik } from "formik";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as yup from "yup";
import { auth } from "../firebase/config";
import { SnackbarProviderActionType, useSnackbar } from "../providers";

interface Form {
  email: string;
}
const initialValues: Form = {
  email: "",
};
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Email format must be correct")
    .required("Email is required"),
});

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const { dispatchSnackbar } = useSnackbar();

  async function handleSubmitForm(form: Form) {
    const { email } = form;

    try {
      await sendPasswordResetEmail(auth, email.trim());
      dispatchSnackbar({
        message: "Password Reset Email Sent!",
        variant: "success",
        type: SnackbarProviderActionType.OPEN,
      });
      navigation.canGoBack() && navigation.goBack();
    } catch (e) {
      if (!(e instanceof FirebaseError)) {
        return dispatchSnackbar({
          message: "Something went wrong",
          variant: "error",
          type: SnackbarProviderActionType.OPEN,
        });
      }
      if (e.code === "auth/user-not-found") {
        return dispatchSnackbar({
          message: "Email Not Found",
          variant: "error",
          type: SnackbarProviderActionType.OPEN,
        });
      }
      dispatchSnackbar({
        message: e.message,
        variant: "error",
        type: SnackbarProviderActionType.OPEN,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image style={styles.logo} source={require("../assets/dusted.png")} />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            dirty,
            isValid,
            isSubmitting,
          }) => (
            <View style={styles.form}>
              <TextInput
                mode="outlined"
                style={styles.input}
                outlineStyle={styles.inputOutline}
                activeOutlineColor="#000"
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={Boolean(errors.email && touched.email)}
              />
              <HelperText
                type="error"
                visible={Boolean(errors.email && touched.email)}
              >
                {errors.email}
              </HelperText>
              <Button
                style={styles.button}
                labelStyle={styles.buttonLabel}
                buttonColor="#000000"
                mode="contained"
                disabled={!dirty || !isValid || isSubmitting}
                onPress={() => handleSubmit()}
              >
                Send Reset Password Email
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
    padding: 32,
    paddingBottom: 50,
  },
  body: {
    alignItems: "center",
  },
  logo: {
    marginTop: "40%",
    resizeMode: "contain",
    height: 42.72,
    width: 181,
  },
  form: {
    width: "100%",
    paddingVertical: 24,
  },
  input: {
    paddingVertical: 8,
    marginTop: 12,
    fontSize: 20,
    textAlign: "center",
  },
  inputOutline: {
    borderRadius: 100,
    borderColor: "#AAA",
  },
  button: {
    marginVertical: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 0,
  },
  buttonLabel: {
    // fontSize: 24,
    // fontFamily: "Inter_700Bold",
    // lineHeight: 24,
  },
  text: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
});

export default ForgetPasswordScreen;
