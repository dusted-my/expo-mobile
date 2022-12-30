import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Button, Chip, TextInput } from "react-native-paper";
import { useQuery } from "react-query";
import Cleaner from "../components/Cleaner";
import HomeScreenCategories from "../components/HomeScreen/Categories";
import HomeScreenCleaners from "../components/HomeScreen/Cleaners";
import Navbar from "../components/Navbar";
import { mockCategories } from "../mocks";
import { SnackbarProviderActionType, useSnackbar } from "../providers";
import { getCleaners } from "../queries";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ height: "30%" }}>
          <ImageBackground
            style={styles.banner}
            resizeMode="cover"
            source={require("../assets/background.png")}
          >
            <Text style={styles.bannerTitle}>
              Services that suits your needs
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
          <HomeScreenCategories navigation={navigation} />
          <HomeScreenCleaners navigation={navigation} />
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
    marginBottom: 220,
  },
});

export default HomeScreen;
