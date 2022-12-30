import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { IconButton, List, MD3Colors } from "react-native-paper";
import { ICleaner } from "../interfaces";

interface Props {
  cleaner: ICleaner;
}
const Cleaner = (props: Props) => {
  const { cleaner } = props;

  return (
    <View style={styles.card} key={cleaner.name}>
      <View style={styles.body}>
        <Image
          style={styles.profile}
          source={require("../assets/cleaner.jpg")}
        ></Image>
        <View style={styles.profileDescription}>
          <Text style={styles.name}>{cleaner.name}</Text>
          <Text style={styles.job}>{cleaner.job}</Text>
          <View style={styles.stars}>
            {[...Array(cleaner.star)].map((_) => (
              <List.Icon icon="star" color="#ECC12A" style={{ margin: 0 }} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: "#EEE",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "#FFF",
    padding: 20,
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
    marginBottom: 5,
  },
  job: {
    marginBottom: 5,
  },
  profileDescription: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  stars: {
    flexDirection: "row",
  },
});

export default Cleaner;
