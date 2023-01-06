import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
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
import { IContract } from "../interfaces";
import { PrivateRoute } from "../providers";

const options = ["Credit/Debit", "Cash", "E-wallet"];

const ContractScreen = ({ navigation }) => {
  const route = useRoute();
  const { contract }: { contract: IContract } = route.params as any;

  const [selected, setSelected] = useState("");

  function select(value: string) {
    setSelected(value);
  }

  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/dusted.png")}
            ></Image>
            <Text style={styles.page}>Contract Details</Text>
            <Image
              style={styles.profile}
              // source={{ uri: contract. }}
            />
            <Text style={styles.name}>Anna Jowel</Text>
            <Text>Total:</Text>
            <Text style={styles.price}>RM {contract.total}</Text>
          </View>
          <View style={styles.card}>
            {contract.status === "cleaner_done" ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
              </ScrollView>
            ) : null}
            <View>
              <View>
                <Text style={styles.title}>Location: </Text>
                <Text style={styles.details}>{contract.address}</Text>
              </View>
              <View>
                <Text style={styles.title}>Contact: </Text>
                <Text style={styles.details}></Text>
              </View>
              <View>
                <Text style={styles.title}>Date: </Text>
                <Text style={styles.details}>
                  {dayjs(contract.startAt.toDate()).format("ddd, D MMM YYYY")}
                </Text>
              </View>
              <View>
                <Text style={styles.title}>Time: </Text>
                <Text style={styles.details}>
                  {dayjs(contract.startAt.toDate()).format("hh:mm a")}
                  {" - "}
                  {dayjs(contract.endAt.toDate()).format("hh:mm a")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Booking Confirmed")}
              >
                <LinearGradient
                  colors={["#CF91FF", "#5782F5"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.9, y: 0.5 }}
                  style={[styles.button, styles.buttonBook]}
                >
                  <Text style={styles.buttonLabelBook}>Pay</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  body: {
    margin: 20,
    borderWidth: 1,
    borderColor: "#FFF",
    shadowColor: "000",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    height: 42.72,
    width: 181,
    marginLeft: 26,
  },
  card: {},
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

export default ContractScreen;
