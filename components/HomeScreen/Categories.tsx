import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import CategoryChips from "../CategoryChips";

const HomeScreenCategories = ({ navigation }) => {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Categories</Text>
      </View>
      <CategoryChips
        handlePress={(category) =>
          navigation.navigate("Cleaner List", { category })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
});

export default HomeScreenCategories;
