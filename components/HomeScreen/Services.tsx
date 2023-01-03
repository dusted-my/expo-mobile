import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ServiceChips from "../ServiceChips";

const HomeScreenServices = ({ navigation }) => {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Services</Text>
      </View>
      <ServiceChips
        handlePress={(service) =>
          navigation.navigate("Cleaner List", { service })
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

export default HomeScreenServices;
