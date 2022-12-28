import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Button, Chip, TextInput } from "react-native-paper";
import Navbar from "../components/Navbar";

const categories = [
  "Cleaning",
  "Laundry",
  "Repair",
  "Vacuuming",
  "Babysitting",
];

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ height: "35%" }}>
          <ImageBackground
            style={styles.banner}
            resizeMode="cover"
            source={require("../assets/background.png")}
          >
            <Text
              style={styles.bannerTitle}
              onPress={() => navigation.navigate("Cleaner List")}
            >
              Services to suite your needs
            </Text>
            <View style={styles.searchContainer}>
              <TextInput
                outlineStyle={styles.search}
                mode="outlined"
                placeholder="Search"
                left={<TextInput.Icon icon="magnify" />}
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.main}>
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.title}>Categories</Text>
              <Button mode="text" textColor="gray">
                View all
              </Button>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <Chip
                  style={styles.categoryChip}
                  textStyle={styles.categoryChipText}
                  mode="outlined"
                  key={category}
                >
                  {category}
                </Chip>
              ))}
            </ScrollView>
          </View>
          <Text>Browse by Person</Text>
          <Text>View all</Text>
          <View>
            <Text>Anna Jowel</Text>
            <Text>Cleaning</Text>
            {/* <Image
              style={styles.starSvg}
              source={require("../assets/yellow-star.svg")}
            ></Image>
            <Image source={require("../assets/grey-star.svg")}></Image> */}
            <Image
              style={styles.cleanerJpg}
              source={require("../assets/cleaner.jpg")}
            ></Image>
          </View>
          <Image source={require("../assets/banner.png")}></Image>
        </View>
      </ScrollView>
      <Navbar navigation={navigation}></Navbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    left: "50%",
    bottom: -25,
    transform: [{ translateX: -150 }],
  },
  search: {
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 50,
    width: 300,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  main: {
    padding: 18,
    paddingTop: 36,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryChip: {
    marginHorizontal: 8,
    borderRadius: 50,
    borderColor: "#000",
    backgroundColor: "#0000",
  },
  categoryChipText: {
    color: "#000",
  },
  starSvg: {
    width: 500,
    height: 500,
  },
  cleanerJpg: {
    width: 73,
    height: 73,
    borderRadius: 100,
  },
  banner: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  bannerTitle: {
    padding: 32,
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    maxWidth: "70%",
  },
  top: {},
});

export default HomeScreen;
