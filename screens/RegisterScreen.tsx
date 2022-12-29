import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Formik } from "formik";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  Button,
  HelperText,
  MD3Colors,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { auth } from "../firebase/config";
import * as yup from "yup";
import MySnackbar from "../components/MySnackbar";

interface Form {
  fullName: string;
  email: string;
  password: string;
}

const initialValues: Form = {
  fullName: "",
  email: "",
  password: "",
};

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("Full Name is Required")
    .min(3, "Full Name must have at least 3 characters")
    .max(100, "Full Name must have at most 100 characters"),
  email: yup
    .string()
    .email("Email format must be correct")
    .required("Email is required")
    .min(3, "Email must have at least 3 characters")
    .max(100, "Email must have at most 100 characters"),
  password: yup
    .string()
    .required("Password is Required")
    .min(6, "Password must have at least 6 characters")
    .max(100, "Password must have at most 100 characters"),
});

const RegisterScreen = ({ navigation }) => {
  const [toast, setToast] = useState("");
  const openToast = (msg: string) => setToast(msg);
  const dismissToast = () => setToast("");

  async function handleSubmitForm(form: Form) {
    const { fullName, email, password } = form;

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      await updateProfile(userCred.user, { displayName: fullName.trim() });
      navigation.navigate("Home");
      openToast("Registration Successful!");
    } catch (e) {
      if (!(e instanceof FirebaseError)) {
        return openToast("Something went wrong");
      }
      if (e.code === "auth/email-already-in-use") {
        return openToast("Email is Used");
      }
      openToast(e.code);
    }
  }

  return (
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
                placeholder="Full Name"
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                error={Boolean(errors.fullName && touched.fullName)}
              />
              <HelperText
                type="error"
                visible={Boolean(errors.fullName && touched.fullName)}
              >
                {errors.fullName}
              </HelperText>
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
                Register
              </Button>
              <Text style={styles.text}>
                By registering, I agree upon all the terms and conditions
              </Text>
            </View>
          )}
        </Formik>
      </View>
      <MySnackbar
        variant="error"
        visible={Boolean(toast)}
        onDismiss={dismissToast}
      >
        {toast}
      </MySnackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
    padding: 32,
    paddingBottom: 50,
    position: "relative",
  },
  body: {
    alignItems: "center",
  },
  logo: {
    marginTop: "25%",
    resizeMode: "contain",
    height: 42.72,
    width: 181,
  },
  form: {
    width: "100%",
    paddingVertical: 24,
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
  input: {
    paddingVertical: 8,
    marginTop: 12,
    fontSize: 20,
    textAlign: "center",
  },
  inputOutline: {
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    paddingTop: 30,
  },
});

export default RegisterScreen;
