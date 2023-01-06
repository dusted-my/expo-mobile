import { signOut } from "firebase/auth";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Chip, Divider, MD2Colors } from "react-native-paper";
import Navbar from "../components/Navbar";
import { auth } from "../firebase/config";
import { PrivateRoute, useAuthState } from "../providers";

const SettingsScreen = ({ navigation }) => {
  const { details } = useAuthState();

  function handleLogout() {
    signOut(auth);
    navigation.navigate("Welcome");
  }

  return (
    <PrivateRoute navigation={navigation}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View>
            <View style={styles.details}>
              <Image
                style={styles.profile}
                source={require("../assets/profile-pic.jpg")}
              />
              <View style={styles.profileDescription}>
                <Text style={styles.name}>{details.fullName}</Text>
                {details.isCleaner ? <Chip>Cleaner</Chip> : null}
              </View>
            </View>
            <View>
              <Text style={styles.title}>General</Text>
              {/* <TouchableOpacity onPress={() => alert("Hello")}>
                <Text style={styles.options}>Settings</Text>
              </TouchableOpacity>
              <Divider></Divider>
              <TouchableOpacity onPress={() => alert("Hello")}>
                <Text style={styles.options}>Help Center</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Edit Profile")}
              >
                <Text style={styles.options}>Edit Profile</Text>
              </TouchableOpacity>
              <Divider></Divider>
              {/* <TouchableOpacity onPress={() => navigation.navigate("Report")}>
                <Text style={styles.options}>Report</Text>
              </TouchableOpacity>
              <Divider></Divider> */}
            </View>
            {!details.isCleaner ? (
              <View>
                <Text style={styles.title}>Opportunities</Text>
                {details.status === "pending_cleaner" ? (
                  <View>
                    <Text style={[styles.options, styles.disabledOption]}>
                      Be a Cleaner
                    </Text>
                    <Text style={styles.appliedText}>You have applied</Text>
                    <Divider></Divider>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Request")}
                  >
                    <Text style={styles.options}>Clean with Dusted</Text>
                    <Text></Text>
                    <Divider></Divider>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>
          <View style={styles.logOut}>
            <Button
              style={styles.logOutButton}
              labelStyle={styles.buttonLabel}
              mode="outlined"
              textColor="red"
              onPress={handleLogout}
            >
              Log Out
            </Button>
          </View>
        </View>
        <Navbar navigation={navigation}></Navbar>
      </View>
    </PrivateRoute>
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
    justifyContent: "center",
    alignItems: "flex-start",
    height: 50,
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
  disabledOption: {
    color: MD2Colors.grey500,
  },
  appliedText: {
    paddingBottom: 15,
    paddingLeft: 10,
    color: MD2Colors.orange700,
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
