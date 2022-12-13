import {
  Inter_500Medium,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
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
        <Button
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Log In
        </Button>
        <Button
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Register
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    // justifyContent: "center",
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
  buttonLabel: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Inter_500Medium",
  },
});

export default HomeScreen;
