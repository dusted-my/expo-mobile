import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";

const options = ["Credit/Debit", "Cash", "E-wallet"];

const PaymentScreen = () => {
  const [selected, setSelected] = useState("");

  function select(value: string) {
    setSelected(value);
  }

  return (
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
          <View style={styles.buttonRow}>
            {options.map((option) => (
              <Button
                key={option}
                style={[
                  styles.complaintButton,
                  selected === option && styles.selectedButton,
                ]}
                labelStyle={[
                  styles.complaintButtonLabel,
                  selected === option && styles.selectedButtonLabel,
                ]}
                mode="outlined"
                onPress={() => select(option)}
              >
                {option}
              </Button>
            ))}
          </View>
          <View style={styles.information}>
            <View style={styles.details}>
              <Text>Location: </Text>
              <Text style={{ flexWrap: "wrap", alignItems: "flex-start" }}>
                Jalan 29 Pandan Indah Wilayah Persekutuan 56200 Malaysia
              </Text>
            </View>
            <View style={styles.details}>
              <Text>Contact No.: </Text>
              <Text style={{ flexWrap: "wrap", alignItems: "flex-start" }}>
                03-9274-3421
              </Text>
            </View>
            <View style={styles.details}>
              <Text>Date: </Text>
              <Text style={{ flexWrap: "wrap", alignItems: "flex-start" }}>
                14 Nov 2022 14:30 - 15:30
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    justifyContent: "space-between",
    height: "100%",
    padding: 32,
    paddingBottom: 50,
  },
  body: {
    alignItems: "center",
  },
  logo: {
    marginTop: "5%",
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
    paddingBottom: 20,
  },
  price: {
    fontSize: 24,
    paddingVertical: 20,
    fontWeight: "500",
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
  complaintButtonLabel: {
    color: "#CCC",
  },
  information: {
    alignItems: "center",
  },
  details: {
    // flexDirection: "row",
    maxWidth: "50%",
  },
});

export default PaymentScreen;
