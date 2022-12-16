import {
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

const RequestScreen = ({ navigation }) => {
  const [nric, setNric] = useState("");
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  function handleSubmit() {
    // TODO: INTEGRATE LOG IN
    navigation.navigate("Home");
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Application to Become Cleaner</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            outlineStyle={styles.inputOutline}
            placeholder="NRIC Name"
            value={name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            outlineStyle={styles.inputOutline}
            placeholder="Date of Birth"
            value={dob}
            onChangeText={(text) => setDob(text)}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            outlineStyle={styles.inputOutline}
            placeholder="NRIC Number"
            value={nric}
            onChangeText={(text) => setNric(text)}
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            outlineStyle={styles.inputOutline}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            mode="outlined"
          />

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
    padding: 40,
  },
  title: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
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
    marginVertical: 12,
    fontSize: 20,
    textAlign: "center",
  },
  inputOutline: {
    borderRadius: 100,
    borderColor: "#AAA",
  },
});
export default RequestScreen;
