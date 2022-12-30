import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";

const options = ["Credit/Debit", "Cash", "E-wallet"];

const BookingConfirmedScreen = ({ navigation }) => {
  const [selected, setSelected] = useState("");

  function select(value: string) {
    setSelected(value);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.body}>
          <Image
            style={styles.logo}
            source={require("../assets/dusted.png")}
          ></Image>
          <View style={styles.card}>
            <Text style={styles.page}>Booking Details</Text>
            <Image
              style={styles.profile}
              source={require("../assets/cleaner.jpg")}
            />
            <Text style={styles.name}>Anna Jowel</Text>
            <Text>Fair:</Text>
            <Text style={styles.price}>RM 80</Text>
            <View>
              <View>
                <Button
                  style={[styles.complaintButton, styles.selectedButton]}
                  labelStyle={[
                    styles.complaintButtonLabel,
                    styles.selectedButtonLabel,
                  ]}
                  mode="outlined"
                >
                  Credit
                </Button>
              </View>
              <View>
                <Text style={styles.title}>Location: </Text>
                <Text style={styles.details}>
                  Jalan 29 Pandan Indah Wilayah Persekutuan 56200 Malaysia
                </Text>
              </View>
              <View>
                <Text style={styles.title}>Contact No.: </Text>
                <Text style={styles.details}>03-9274-3421</Text>
              </View>
              <View>
                <Text style={styles.title}>Date: </Text>
                <Text style={styles.details}>14 Nov 2022 14:30 - 15:30</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  body: {
    alignItems: "center",
    margin: 20,
    borderWidth: 1,
    borderColor: "#FFF",
    shadowColor: "000",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 50,
    paddingVertical: 20,
    paddingBottom: 40,
    justifyContent: "center",
  },
  logo: {
    // marginTop: "10%",
    resizeMode: "contain",
    height: 42.72,
    width: 181,
    marginLeft: 26,
  },
  card: {
    alignItems: "center",
  },
  page: {
    fontSize: 20,
    paddingTop: 40,
  },
  profile: {
    height: 111,
    width: 111,
    borderRadius: 100,
    alignItems: "center",
    marginVertical: 20,
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    paddingBottom: 16,
  },
  price: {
    fontSize: 24,
    paddingVertical: 18,
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  complaintButton: {
    marginHorizontal: 50,
    borderColor: "#CCC",
  },
  selectedButton: {
    borderColor: "#000",
  },
  selectedButtonLabel: {
    color: "#000",
  },
  complaintButtonLabel: {
    color: "#CCC",
  },
  information: {
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "400",

    paddingTop: 20,
  },
  details: {
    flexWrap: "wrap",
    alignItems: "flex-start",

    fontSize: 16,
    fontWeight: "300",
    // textAlign: "center",
  },
  button: {
    marginTop: 40,
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

export default BookingConfirmedScreen;
