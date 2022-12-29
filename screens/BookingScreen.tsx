import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Divider, List, TextInput } from "react-native-paper";

const options = ["Cleaning", "Laundry", "Repair"];

const BookingScreen = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [selected, setSelected] = useState<string[]>([]);

  function select(value: string) {
    if (selected.includes(value)) {
      setSelected((selected) =>
        selected.filter((selection) => selection !== value)
      );
      return;
    }
    setSelected((selected) => selected.concat(value));
  }
  function handleSubmit() {
    alert(selected);
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileMessage}>
          <View style={styles.body}>
            <Image
              style={styles.profile}
              source={require("../assets/cleaner.jpg")}
            ></Image>
            <View style={styles.profileDescription}>
              <Text style={styles.name}>Anna Jowel</Text>
              <View style={styles.stars}>
                {[...Array(5)].map((_) => (
                  <List.Icon
                    icon="star"
                    color="#ECC12A"
                    style={{ margin: 0 }}
                  />
                ))}
              </View>
            </View>
          </View>
          <List.Icon
            style={styles.message}
            color="#000"
            icon="message-minus-outline"
          />
        </View>
        <Divider style={styles.divider}></Divider>
        <View>
          <Text style={styles.title}>Address</Text>
          <TextInput
            multiline
            numberOfLines={5}
            style={styles.address}
            outlineStyle={styles.addressOutline}
            placeholder="Enter address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            mode="outlined"
          />
          <View style={styles.servies}>
            <Text style={styles.title}>Services</Text>
            <View style={styles.buttonRow}>
              {options.map((option) => (
                <Button
                  key={option}
                  style={[
                    styles.complaintButton,
                    selected.includes(option) && styles.selectedButton,
                  ]}
                  labelStyle={[
                    styles.complaintButtonLabel,
                    selected.includes(option) && styles.selectedButtonLabel,
                  ]}
                  mode="outlined"
                  onPress={() => select(option)}
                >
                  {option}
                </Button>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.title}>Schedule</Text>
            <View style={styles.schedule}>
              <View>
                <View style={styles.body}>
                  <List.Icon
                    style={styles.message}
                    color="#000"
                    icon="calendar"
                  />
                  <View style={styles.profileDescription}>
                    <Text style={styles.scheduleName}>Date</Text>
                    <Text style={styles.schduleChosen}>
                      Wednesday, 18 Dec 2022
                    </Text>
                  </View>
                </View>
              </View>
              <Divider style={styles.scheduleDivider}></Divider>
              <View>
                <View style={styles.body}>
                  <List.Icon
                    style={styles.message}
                    color="#000"
                    icon="clock-time-four-outline"
                  />
                  <View style={styles.profileDescription}>
                    <Text style={styles.scheduleName}>Time</Text>
                    <Text style={styles.schduleChosen}>08:00am - 15:00pm</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.title}>Notes</Text>
            <TextInput
              multiline
              numberOfLines={5}
              style={styles.address}
              outlineStyle={styles.addressOutline}
              placeholder="Any notes for us? "
              value={notes}
              onChangeText={(text) => setNotes(text)}
              mode="outlined"
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
            <LinearGradient
              colors={["#FF70AF", "#5F48F5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.9, y: 0.5 }}
              style={[styles.button, styles.buttonBook]}
            >
              <Text style={styles.buttonLabelBook}>Book</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  },
  message: {
    marginRight: 30,
  },
  stars: {
    flexDirection: "row",
  },
  divider: {
    borderWidth: 1,
    borderColor: "#DADADA",
    width: "100%",
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    paddingTop: 5,
    paddingBottom: 16,
  },
  address: {
    marginVertical: 2,
    fontSize: 16,
    width: "100%",
    height: 130,
    textAlignVertical: "top",
  },
  addressOutline: {
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 10,
    marginBottom: 18,
  },
  buttonRow: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  complaintButton: {
    marginHorizontal: 10,
    borderColor: "#CCC",
  },
  selectedButton: {
    borderColor: "#000",
  },
  selectedButtonLabel: {
    color: "#000",
  },
  buttonLabel: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    lineHeight: 24,
    paddingHorizontal: 15,
  },
  complaintButtonLabel: {
    color: "#CCC",
  },
  servies: {
    paddingBottom: 10,
  },
  schedule: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  scheduleName: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 5,
  },
  schduleChosen: {
    marginBottom: 5,
    color: "#006AFF",
  },
  scheduleDivider: {
    width: "80%",
    color: "#555",
    marginLeft: 80,
    marginVertical: 2,
  },
  buttomPadding: {
    paddingTop: 10,
  },
  button: {
    marginVertical: 20,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 0,
  },
  buttonBook: {
    paddingVertical: 16,
  },
  buttonLabelBook: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default BookingScreen;
