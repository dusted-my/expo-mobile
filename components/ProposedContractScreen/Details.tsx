import dayjs from "dayjs";
import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { IContract, ICustomer } from "../../interfaces";
import { SnackbarProviderActionType, useSnackbar } from "../../providers";
import { MD2Colors } from "react-native-paper";

interface Props {
  contract: IContract;
  cleaner: ICustomer;
}
const Details = (props: Props) => {
  const { contract, cleaner } = props;
  const { dispatchSnackbar } = useSnackbar();

  const handleEmail = async (email: string) => {
    const mailUrl = `mailto:${email}`;
    try {
      const can = await Linking.canOpenURL(mailUrl);
      if (can) return await Linking.openURL(mailUrl);
      await Clipboard.setStringAsync(email);
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "info",
        message: "Email Copied!",
      });
    } catch (e: any) {
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: e.message || "Error emailing or copying email",
      });
    }
  };

  return (
    <View>
      <View>
        <Text style={styles.title}>Address: </Text>
        <Text style={styles.details}>{contract.address}</Text>
      </View>
      <View>
        <Text style={styles.title}>Service: </Text>
        <Text style={[styles.details, { textTransform: "capitalize" }]}>
          {contract.serviceRequired}
        </Text>
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
      <View>
        <Text style={styles.title}>Notes: </Text>
        <Text style={styles.details}>{contract.notes}</Text>
      </View>
      <View>
        <Text style={styles.title}>Cleaner Contact: </Text>
        <Text
          style={[styles.details, styles.link]}
          onPress={() => handleEmail(cleaner.email)}
        >
          {cleaner.email}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  link: {
    color: MD2Colors.blue500,
    textDecorationLine: "underline",
  },
});

export default Details;
