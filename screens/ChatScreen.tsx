import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import { PrivateRoute } from "../providers";

const ChatScreen = ({ navigation }) => {
  return (
    <PrivateRoute navigation={navigation}>
      <View style={styles.container}>
        <Text>ChatScreen</Text>
        <Navbar navigation={navigation}></Navbar>
      </View>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
});

export default ChatScreen;
