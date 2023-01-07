import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, MD2Colors } from "react-native-paper";
import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import { IContract } from "../interfaces";

interface Props {
  status: IContract["status"];
}
const ContractStatus = (props: Props) => {
  const { status } = props;

  const renderStatus = () => {
    switch (status) {
      case "client_submitting":
        return (
          <Chip style={styles.warning} textStyle={styles.warningText}>
            Pending Confimation
          </Chip>
        );
      case "client_submitted":
        return (
          <Chip style={styles.info} textStyle={styles.infoText}>
            Confirmed
          </Chip>
        );
      case "cleaner_approved":
        return (
          <Chip style={styles.info} textStyle={styles.infoText}>
            Cleaner Accepted
          </Chip>
        );
      case "cleaner_declined":
        return (
          <Chip style={styles.error} textStyle={styles.errorText}>
            Cleaner Declined
          </Chip>
        );
      case "cleaner_done":
        return (
          <Chip style={styles.info} textStyle={styles.infoText}>
            Cleaner Done
          </Chip>
        );
      case "client_done":
        return (
          <Chip style={styles.success} textStyle={styles.successText}>
            Paid
          </Chip>
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderStatus()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "baseline",
  },
  warning: {
    backgroundColor: MD2Colors.orange50,
  },
  warningText: {
    color: MD2Colors.orange600,
  },
  info: {
    backgroundColor: MD2Colors.blue50,
  },
  infoText: {
    color: MD2Colors.blue600,
  },
  error: {
    backgroundColor: MD2Colors.red50,
  },
  errorText: {
    color: MD2Colors.red600,
  },
  success: {
    backgroundColor: MD2Colors.green50,
  },
  successText: {
    color: MD2Colors.green600,
  },
});

export default ContractStatus;
