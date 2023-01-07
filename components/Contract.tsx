import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MD2Colors } from "react-native-paper";
import { IContract } from "../interfaces";
import ContractStatus from "./ContractStatus";

interface Props {
  contract: IContract;
}
const Contract = (props: Props) => {
  const { contract } = props;

  return (
    <View style={styles.contract}>
      <Text style={styles.contractService}>{contract.serviceRequired}</Text>
      <Text style={styles.contractAddress}>{contract.address}</Text>
      <Text style={styles.contractDateTime}>
        {dayjs(contract.startAt.toDate()).format("ddd, D MMM YYYY hh:mm a")}
        {" - "}
        {dayjs(contract.endAt.toDate()).format("hh:mm a")}
      </Text>
      <View style={styles.status}>
        <ContractStatus status={contract.status} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contract: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    alignItems: "stretch",
  },
  contractService: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
  contractAddress: {
    paddingVertical: 4,
  },
  contractDateTime: {
    color: MD2Colors.grey500,
  },
  status: {
    marginTop: 8,
  },
});

export default Contract;
