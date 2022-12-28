import {
  Inter_500Medium,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Navbar from "../components/Navbar";

const WelcomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_900Black,
    Inter_500Medium,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={require("../assets/dusted.png")} />
      <Text style={styles.text}>We made cleaning service easier for you</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <LinearGradient
            colors={["#FBD52D", "#EF3A7B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 0.5 }}
            style={[styles.button, styles.buttonLogIn]}
          >
            <Text style={styles.buttonLabelLogIn}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Button
          onPress={() => navigation.navigate("Settings")}
          mode="outlined"
          style={[styles.button, styles.buttonRegister]}
          textColor="#000000"
        >
          <Text style={styles.buttonLabelRegister}>Register</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    // justifyContent: "center",
    marginTop: "20%",
    alignItems: "center",
    height: "100%",
    padding: 32,
  },
  logo: {
    marginTop: "20%",
    resizeMode: "contain",
    height: 42.72,
    width: 181,
  },
  text: {
    paddingVertical: 64,
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Inter_700Bold",
  },
  container: {
    width: "100%",
  },
  button: {
    marginVertical: 12,
    padding: 8,
    borderRadius: 100,
  },
  buttonLogIn: {
    paddingVertical: 16,
  },
  buttonRegister: {
    borderWidth: 2,
    borderColor: "#000000",
  },
  buttonLabelLogIn: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    color: "#FFFFFF",
  },
  buttonLabelRegister: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    color: "#00000",
  },
});

export default WelcomeScreen;
