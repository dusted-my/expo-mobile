import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Button, RadioButton, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { PrivateRoute } from "../providers";

const RequestScreen = ({ navigation }) => {
  const [nric, setNric] = useState("");
  const [dob, setDob] = useState("");
  const [value, setValue] = React.useState("first");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [nricFront, setNricFront] = useState(null);
  const [nricBack, setNricBack] = useState(null);

  const pickImage = async (type: "front" | "back") => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (result.canceled) return;

    switch (type) {
      case "front":
        setNricFront(result.assets[0].uri);
        break;
      case "back":
        setNricBack(result.assets[0].uri);
        break;
    }
  };

  function handleSubmit() {
    // TODO: INTEGRATE LOG IN
    navigation.navigate("Home");
  }
  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView>
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
            <Text style={styles.textGender}>Gender:</Text>
            <View style={styles.radioButton}>
              <RadioButton.Group
                onValueChange={(newValue) => setValue(newValue)}
                value={value}
              >
                <View style={styles.radioButton}>
                  <RadioButton.Android value="first" />
                  <Text style={styles.radioButtonText}>Male</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton.Android value="second" />
                  <Text style={styles.radioButtonText}>Female</Text>
                </View>
              </RadioButton.Group>
            </View>
            <Text style={styles.textGender}>Photocopy of NRIC: </Text>
            <View style={styles.photo}>
              <View style={styles.rectangleBorder}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {nricFront && (
                    <Image
                      source={{ uri: nricFront }}
                      style={{ width: 200, height: 200 }}
                    />
                  )}
                  <Button onPress={() => pickImage("front")}>NRIC Front</Button>
                </View>
              </View>
            </View>
            <View style={styles.rectangleBorder}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {nricBack && (
                  <Image
                    source={{ uri: nricBack }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
                <Button onPress={() => pickImage("back")}>NRIC Back</Button>
              </View>
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
      </ScrollView>
    </PrivateRoute>
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
  textGender: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    padding: 10,
    paddingTop: 30,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    // paddingLeft: 30,
  },
  radioButtonText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  photo: {
    paddingBottom: 30,
  },
  rectangleBorder: {
    borderColor: "#DDD",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    paddingVertical: 60,
    paddingBottom: 30,
    textAlign: "center",
  },
  photocopy: {
    height: 128,
    width: 128,
    borderColor: "salmon",
    position: "absolute",
    zIndex: 99,
    top: "100%",
    left: "100%",
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
  buttomPadding: {
    paddingTop: 30,
  },
});
export default RequestScreen;
