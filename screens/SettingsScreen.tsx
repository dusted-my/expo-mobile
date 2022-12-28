import React from "react";
import {
  Inter_500Medium,
  Inter_700Bold,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Divider } from "react-native-paper";
import Navbar from "../components/Navbar";

const SettingsScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View>
          <View style={styles.details}>
            <Image
              style={styles.profile}
              source={require("../assets/profile-pic.jpg")}
            />
            <View style={styles.profileDescription}>
              <Text style={styles.name}>Jace Wayland</Text>
              <TouchableOpacity onPress={() => alert("Hello")}>
                <Text style={styles.editButton}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.title}>General</Text>
            <TouchableOpacity onPress={() => alert("Hello")}>
              <Text style={styles.options}>Settings</Text>
            </TouchableOpacity>
            <Divider></Divider>
            <TouchableOpacity onPress={() => alert("Hello")}>
              <Text style={styles.options}>Help Center</Text>
            </TouchableOpacity>
            <Divider></Divider>
            <TouchableOpacity onPress={() => navigation.navigate("Report")}>
              <Text style={styles.options}>Report</Text>
            </TouchableOpacity>
            <Divider></Divider>
          </View>
          <View>
            <Text style={styles.title}>Opportunities</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Request")}>
              <Text style={styles.options}>Clean with Dusted</Text>
              <Divider></Divider>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logOut}>
          <Button
            onPress={() => navigation.navigate("Welcome")}
            style={styles.logOutButton}
            labelStyle={styles.buttonLabel}
            mode="outlined"
            textColor="red"
          >
            Log Out
          </Button>
        </View>
      </View>
      <Navbar navigation={navigation}></Navbar>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
    height: "100%",
  },
  container: {
    marginTop: 60,
    padding: 40,
    height: "100%",
    justifyContent: "space-between",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginRight: 16,
  },
  profileDescription: {
    display: "flex",
    flexDirection: "column",
  },
  editButton: {
    paddingTop: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    paddingTop: 40,
    paddingBottom: 20,
  },
  options: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    paddingVertical: 15,
    paddingLeft: 10,
  },
  logOut: {
    paddingBottom: 30,
  },
  logOutButton: {
    borderColor: "red",
    borderWidth: 1,
    marginVertical: 12,
    padding: 8,
    borderRadius: 100,
    marginBottom: 140,
  },
  buttonLabel: {
    fontSize: 22,
    fontFamily: "Inter_500Medium",
    lineHeight: 24,
  },
});
export default SettingsScreen;
