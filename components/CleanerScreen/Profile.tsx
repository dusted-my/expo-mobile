import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, List, MD2Colors } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { ICustomer } from "../../interfaces";

interface Props {
  cleaner: ICustomer;
  goFeedbacks: () => void;
}
const Profile = (props: Props) => {
  const { cleaner, goFeedbacks } = props;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          style={styles.profile}
          source={require("../../assets/cleaner.jpg")}
        ></Image>
        <View style={styles.profileDescription}>
          <Text style={styles.name}>{cleaner.fullName}</Text>
          <Rating
            type="custom"
            readonly
            imageSize={20}
            style={{ alignItems: "flex-start" }}
            tintColor={MD2Colors.grey200}
            startingValue={cleaner.stars}
          />
          <Text style={styles.hourlyRate}>
            RM {cleaner.hourlyRate}.00 / hour
          </Text>
        </View>
      </View>
      <Button mode="text" icon="chevron-double-right" onPress={goFeedbacks}>
        View Feedbacks
      </Button>
      {/* <List.Icon
        style={styles.message}
        color="#000"
        icon="message-minus-outline"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    alignItems: "flex-start",
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
