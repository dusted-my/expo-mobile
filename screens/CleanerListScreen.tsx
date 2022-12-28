import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

const cleaners = [
  {
    name: "Anna Jowel",
    job: "Cleaning",
  },
  {
    name: "Ben Carlson",
    job: "Cleaning",
  },
  {
    name: "Chris Evans",
    job: "Cleaning",
  },
  {
    name: "David Beckham",
    job: "Cleaning",
  },
  {
    name: "Eminem",
    job: "Cleaning",
  },
];

const CleanerListScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.body}>
          <Image
            style={styles.profile}
            source={require("../assets/cleaner.jpg")}
          ></Image>
          <View style={styles.profileDescription}>
            <Text style={styles.name}>Anna Jowel</Text>
            <Text>Cleaning</Text>
            <IconButton
              icon={require("../assets/yellow-star.svg")}
              iconColor={MD3Colors.error50}
              size={20}
              onPress={() => console.log("Pressed")}
            />
          </View>
        </View>
      </View>
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
  card: {
    borderColor: "#EEE",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "#FFF",
  },
  body: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
  },
  profile: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  profileDescription: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },
});

export default CleanerListScreen;
