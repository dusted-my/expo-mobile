import {
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }
};
const FeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          style={styles.logo}
          source={require("../assets/dusted.png")}
        ></Image>
        <Text style={styles.title}>Report Cleaner</Text>
        <Image
          style={styles.cleaner}
          source={require("../assets/cleaner.jpg")}
        ></Image>
        <Button style={styles.complaintButton} mode="outlined">
          Did not show up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
    // padding: 32,
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
  title: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    paddingVertical: 24,
  },
  cleaner: {
    width: 111,
    height: 111,
    borderRadius: 100,
  },
  complaintButton: {
    padding: 40,
  },
});

export default FeedbackScreen;
