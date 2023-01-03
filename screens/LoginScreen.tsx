import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as yup from "yup";
import { auth } from "../firebase/config";
import { SnackbarProviderActionType, useSnackbar } from "../providers";
import { PublicRoute } from "../providers";

interface Form {
  email: string;
  password: string;
}
const initialValues: Form = {
  email: "",
  password: "",
};
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Email format must be correct")
    .required("Email is required"),
  password: yup.string().required("Password is Required"),
});

const LoginScreen = ({ navigation }) => {
  const { dispatchSnackbar } = useSnackbar();

  async function handleSubmitForm(form: Form) {
    const { email, password } = form;

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "success",
        message: "Successfully Logged In!",
      });
      navigation.navigate("Home");
    } catch (e) {
      if (!(e instanceof FirebaseError)) {
        return dispatchSnackbar({
          type: SnackbarProviderActionType.OPEN,
          variant: "error",
          message: "Something went wrong",
        });
      }
      if (e.code === "auth/wrong-password") {
        return dispatchSnackbar({
          type: SnackbarProviderActionType.OPEN,
          variant: "error",
          message: "Wrong Password",
        });
      }
      if (e.code === "auth/user-not-found") {
        return dispatchSnackbar({
          type: SnackbarProviderActionType.OPEN,
          variant: "error",
          message: "Email Not Found",
        });
      }
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: e.message,
      });
    }
  }

  return (
    <PublicRoute navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Image
            style={styles.logo}
            source={require("../assets/dusted.png")}
          ></Image>
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
                <TextInput
                  mode="outlined"
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  activeOutlineColor="#000"
                  secureTextEntry
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={Boolean(errors.password && touched.password)}
                />
                <HelperText
                  type="error"
                  visible={Boolean(errors.password && touched.password)}
                >
                  {errors.password}
                </HelperText>
                <Button
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  buttonColor="#000000"
                  mode="contained"
                  disabled={!dirty || !isValid || isSubmitting}
                  onPress={() => handleSubmit()}
                >
                  Log In
                </Button>
              </View>
            )}
          </Formik>
        </View>
        <Button
          labelStyle={styles.text}
          mode="text"
          textColor="#000"
          onPress={() => navigation.navigate("Forget Password")}
        >
          Forgot your Password?
        </Button>
      </View>
    </PublicRoute>
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
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    lineHeight: 24,
  },
  text: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
});

export default LoginScreen;
