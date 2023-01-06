import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Chip } from "react-native-paper";
import { useQuery } from "react-query";
import {
  PrivateRoute,
  SnackbarProviderActionType,
  useAuthState,
  useSnackbar,
} from "../providers";
import {
  getProposedContracts,
  getReceivedContracts,
} from "../queries/contracts";

const ContractListScreen = ({ navigation }) => {
  const { dispatchSnackbar } = useSnackbar();
  const { user } = useAuthState();

  const { data: proposed, isLoading: isLoadingProposed } = useQuery({
    queryKey: "proposed",
    queryFn: () => getProposedContracts(user.uid),
    onError: () =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: "Unable to find cleaners",
      }),
  });

  const { data: received, isLoading: isLoadingReceived } = useQuery({
    queryKey: "received",
    queryFn: () => getReceivedContracts(user.uid),
    onError: () =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: "Unable to find cleaners",
      }),
  });

  const [tab, setTab] = useState<"proposed" | "received">("proposed");

  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView style={styles.container}>
        <ScrollView horizontal style={styles.chips}>
          <Chip
            style={styles.chip}
            mode={tab === "proposed" ? "flat" : "outlined"}
            onPress={() => setTab("proposed")}
          >
            Proposed
          </Chip>
          <Chip
            style={styles.chip}
            mode={tab === "received" ? "flat" : "outlined"}
            onPress={() => setTab("received")}
          >
            Received
          </Chip>
        </ScrollView>

        {tab === "proposed" ? (
          isLoadingProposed ? (
            <Text>Loading...</Text>
          ) : !proposed.length ? (
            <Text>No Contracts Proposed</Text>
          ) : (
            proposed.map((contract) => (
              <Text key={contract.contractId}>{contract.contractId}</Text>
            ))
          )
        ) : tab === "received" ? (
          isLoadingReceived ? (
            <Text>Loading...</Text>
          ) : !received.length ? (
            <Text>No Contracts Received</Text>
          ) : (
            received.map((contract) => (
              <Text key={contract.contractId}>{contract.contractId}</Text>
            ))
          )
        ) : null}
      </ScrollView>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 32,
    paddingBottom: 50,
  },
  chips: {
    marginVertical: 16,
  },
  chip: {
    marginRight: 16,
  },
});

export default ContractListScreen;
