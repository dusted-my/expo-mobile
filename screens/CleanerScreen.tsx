import { useRoute } from "@react-navigation/native";
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
import CategoryChips from "../components/CategoryChips";
import Address from "../components/CleanerScreen/Address";
import Notes from "../components/CleanerScreen/Notes";
import Profile from "../components/CleanerScreen/Profile";
import Schedule from "../components/CleanerScreen/Schedule";
import Services from "../components/CleanerScreen/Services";
import { ICleaner } from "../interfaces";
import { mockCategories } from "../mocks";

const CleanerScreen = ({ navigation }) => {
  const route = useRoute();
  const { cleaner }: { cleaner: ICleaner } = route.params as any;

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
        <Profile cleaner={cleaner} />
        <Divider style={styles.divider}></Divider>
        <Address value={address} onChangeText={(text) => setAddress(text)} />
        <Services />
        <Schedule />
        <Notes value={notes} onChangeText={(text) => setNotes(text)} />
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
  divider: {
    borderWidth: 1,
    borderColor: "#DADADA",
    width: "100%",
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
  schedule: {
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#FFF",
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
    width: "70%",
    borderColor: "#DADADA",
    marginLeft: 80,
    marginRight: 24,
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

export default CleanerScreen;
