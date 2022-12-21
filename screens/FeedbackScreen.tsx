import {
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [feedback, setFeedback] = useState("");
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }
};
const FeedbackScreen = ({ navigation }) => {
  function handleSubmit() {
    alert("Submit successful!");
  }
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
        <View style={styles.buttonStyle}>
          <View style={styles.buttonRow}>
            <Button
              style={styles.complaintButton}
              labelStyle={styles.complaintButtonLabel}
              mode="outlined"
            >
              Did not show up
            </Button>
            <Button
              style={styles.complaintButton}
              labelStyle={styles.complaintButtonLabel}
              mode="outlined"
            >
              Cleaner seems unwell
            </Button>
          </View>
          <View style={[styles.buttonRow, styles.secondRow]}>
            <Button
              style={styles.complaintButton}
              labelStyle={styles.complaintButtonLabel}
              mode="outlined"
            >
              Improper Handling
            </Button>
            <Button
              style={styles.complaintButton}
              labelStyle={styles.complaintButtonLabel}
              mode="outlined"
            >
              Attitude
            </Button>
          </View>

          <View style={styles.buttonRow}>
            <Button
              style={styles.complaintButton}
              labelStyle={styles.complaintButtonLabel}
              mode="outlined"
            >
              No Face Mask
            </Button>
            <Button
              style={styles.complaintButton}
              labelStyle={styles.complaintButtonLabel}
              mode="outlined"
            >
              Missed Instructions
            </Button>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Tell us more about it</Text>
        </View>
        <View style={styles.buttomPadding}>
          <Button
            style={styles.button}
            labelStyle={styles.buttonLabel}
            buttonColor="#000000"
            mode="contained"
            onPress={handleSubmit}
          >
            Submit
          </Button>
        </View>
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
    // marginTop: "40%",
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
  secondRow: {
    paddingLeft: 40,
  },
  buttonRow: {
    flexDirection: "row",
    padding: 10,
  },
  complaintButton: {
    marginHorizontal: 10,
    borderColor: "#CCC",
  },
  buttonStyle: {
    padding: 10,
  },
  box: {
    borderWidth: 2,
    borderColor: "#CCC",
    width: 300,
    height: 150,
    borderRadius: 10,
    margin: 20,
  },
  buttomPadding: {
    paddingTop: 10,
  },
  button: {
    marginVertical: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 0,
  },
  complaintButtonLabel: {
    color: "#CCC",
  },
  text: {
    color: "#999",
    padding: 10,
  },
  buttonLabel: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    lineHeight: 24,
    paddingHorizontal: 15,
  },
});

export default FeedbackScreen;
