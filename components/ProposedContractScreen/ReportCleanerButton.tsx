import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { IContract } from "../../interfaces";

interface Props {
  status: IContract["status"];
  goReport: () => void;
}
const ReportCleanerButton = (props: Props) => {
  const { status, goReport } = props;

  return status === "cleaner_approved" ||
    status === "cleaner_done" ||
    status === "client_done" ? (
    <View style={styles.container}>
      <Button mode="text" onPress={() => goReport()}>
        Report Cleaner
      </Button>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 16,
  },
});

export default ReportCleanerButton;
