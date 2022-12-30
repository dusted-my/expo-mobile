import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CategoryChips from "../CategoryChips";

const Services = () => {
  return (
    <View>
      <Text style={styles.title}>Services</Text>
      <CategoryChips handlePress={(category) => console.log(category)} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    marginTop: 24,
    marginBottom: 8,
  },
});

export default Services;
