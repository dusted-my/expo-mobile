import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const PaymentScreen = () => {
  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require("../assets/dusted.png")}
      ></Image>
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
    // marginTop: "40%",
    resizeMode: "contain",
    height: 42.72,
    width: 181,
    marginLeft: 20,
  },
});

export default PaymentScreen;
