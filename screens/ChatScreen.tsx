import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";

const ChatScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>ChatScreen</Text>
      <Navbar navigation={navigation}></Navbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
});

export default ChatScreen;
