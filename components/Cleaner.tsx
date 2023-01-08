import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { ICustomer } from "../interfaces";

interface Props {
  cleaner: ICustomer;
}
const Cleaner = (props: Props) => {
  const { cleaner } = props;

  return (
    <View style={styles.card}>
      <View style={styles.body}>
        <Image
          style={styles.profile}
          source={require("../assets/cleaner.jpg")}
        ></Image>
        <View style={styles.profileDescription}>
          <Text style={styles.name}>{cleaner.fullName}</Text>
          <Text style={styles.job}>
            {cleaner.services?.length ? cleaner.services[0] : "-"}
            {cleaner.services?.length > 1 ? "..." : ""}
          </Text>
          <Rating
            readonly
            imageSize={16}
            style={{ alignItems: "flex-start", backgroundColor: "#0000" }}
            startingValue={cleaner.stars}
          />
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
    textTransform: "capitalize",
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
