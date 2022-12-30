import React from "react";
import { View, StyleSheet } from "react-native";
import Cleaner from "../components/Cleaner";
import { mockCleaners } from "../mocks";

const CleanerListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {mockCleaners.map((cleaner) => (
        <Cleaner cleaner={cleaner} />
      ))}
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
});

export default CleanerListScreen;
