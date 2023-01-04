import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { List } from "react-native-paper";
import { ICustomer } from "../../interfaces";

interface Props {
  cleaner: ICustomer;
}
const Profile = (props: Props) => {
  const { cleaner } = props;

  return (
    <View style={styles.profileMessage}>
      <View style={styles.body}>
        <Image
          style={styles.profile}
          source={require("../../assets/cleaner.jpg")}
        ></Image>
        <View style={styles.profileDescription}>
          <Text style={styles.name}>{cleaner.fullName}</Text>
          <View style={styles.stars}>
            {[...Array(cleaner.stars)].map((_, index) => (
              <List.Icon
                icon="star"
                color="#ECC12A"
                style={{ margin: 0 }}
                key={`star-${index}`}
              />
            ))}
          </View>
          <Text style={styles.hourlyRate}>
            RM {cleaner.hourlyRate}.00 / hour
          </Text>
        </View>
      </View>
      <List.Icon
        style={styles.message}
        color="#000"
        icon="message-minus-outline"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  body: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
  },
  profile: {
    height: 70,
    width: 70,
    borderRadius: 100,
    marginRight: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 5,
  },
  profileDescription: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  profileMessage: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  message: {
    marginRight: 30,
  },
  stars: {
    flexDirection: "row",
  },
  hourlyRate: {
    marginTop: 10,
  },
});

export default Profile;
