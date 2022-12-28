import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    // TODO: INTEGRATE LOG IN
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          style={styles.logo}
          source={require("../assets/dusted.png")}
        ></Image>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            outlineStyle={styles.inputOutline}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            outlineStyle={styles.inputOutline}
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            mode="outlined"
          />
          <Button
            style={styles.button}
            labelStyle={styles.buttonLabel}
            buttonColor="#000000"
            mode="contained"
            onPress={handleSubmit}
          >
            Log In
          </Button>
        </View>
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
    marginVertical: 12,
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
