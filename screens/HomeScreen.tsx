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
import Cleaner from "../components/Cleaner";
import Navbar from "../components/Navbar";
import { mockCleaners } from "../mocks";

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
        <View style={{ height: "24%" }}>
          <ImageBackground
            style={styles.banner}
            resizeMode="cover"
            source={require("../assets/background.png")}
          >
            <Text style={styles.bannerTitle}>Services to suite your needs</Text>
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
              <Button
                mode="text"
                textColor="gray"
                onPress={() => navigation.navigate("Cleaner List")}
              >
                View all
              </Button>
            </View>
            <ScrollView
              style={styles.horizontalScroll}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categories.map((category, index) => (
                <Chip
                  style={[
                    styles.categoryChip,
                    { marginRight: index === categories.length - 1 ? 40 : 16 },
                  ]}
                  textStyle={styles.categoryChipText}
                  mode="outlined"
                  key={category}
                >
                  {category}
                </Chip>
              ))}
            </ScrollView>
          </View>
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.title}>Browse by Person</Text>
              <Button
                mode="text"
                textColor="gray"
                onPress={() => navigation.navigate("Cleaner List")}
              >
                View all
              </Button>
            </View>
            <ScrollView
              style={styles.horizontalScroll}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {mockCleaners.map((cleaner, index) => (
                <View
                  style={[
                    styles.cleanerContainer,
                    { marginRight: index === categories.length - 1 ? 40 : 16 },
                  ]}
                  key={cleaner.name}
                >
                  <Cleaner cleaner={cleaner} />
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.poster}>
            <Image
              style={{ width: "100%" }}
              source={require("../assets/banner.png")}
            />
          </View>
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
    padding: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  horizontalScroll: {
    marginTop: 8,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  categoryChip: {
    marginRight: 16,
    borderRadius: 50,
    borderColor: "#000",
    backgroundColor: "#0000",
  },
  categoryChipText: {
    color: "#000",
  },
  cleanerContainer: {
    marginRight: 16,
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
  },
  bannerTitle: {
    padding: 32,
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    maxWidth: "80%",
  },
  poster: {
    paddingVertical: 32,
    marginBottom: 150,
  },
});

export default HomeScreen;
