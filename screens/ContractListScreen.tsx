import dayjs from "dayjs";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Chip, MD2Colors } from "react-native-paper";
import { useQuery } from "react-query";
import Contract from "../components/Contract";
import { useRefreshOnFocus } from "../hooks";
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
  const { user, details } = useAuthState();

  const {
    data: proposed,
    isLoading: isLoadingProposed,
    refetch: refetchProposed,
  } = useQuery({
    queryKey: "proposed",
    queryFn: () => getProposedContracts(user.uid),
    onError: () =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: "Unable to find cleaners",
      }),
    initialData: [],
  });
  useRefreshOnFocus(refetchProposed);

  const {
    data: received,
    isLoading: isLoadingReceived,
    refetch: refetchReceived,
  } = useQuery({
    queryKey: "received",
    queryFn: () => getReceivedContracts(user.uid),
    onError: () =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: "Unable to find cleaners",
      }),
    initialData: [],
  });
  useRefreshOnFocus(refetchReceived);

  const [tab, setTab] = useState<"proposed" | "received">(
    details.isCleaner ? "received" : "proposed"
  );

  const totalEarned = details.isCleaner
    ? received.reduce(
        (prev, curr) => curr.status === "client_done" && prev + curr.total,
        0.0
      )
    : 0.0;

  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView style={styles.container}>
        {details.isCleaner ? (
          <View>
            <Text style={styles.totalEarned}>
              Total Earned: RM {totalEarned.toFixed(2)}
            </Text>
          </View>
        ) : null}
        <View
          style={[
            styles.chips,
            {
              flexDirection: details.isCleaner ? "row-reverse" : "row",
              justifyContent: details.isCleaner ? "flex-end" : "flex-start",
            },
          ]}
        >
          <Chip
            style={styles.chip}
            mode={tab === "proposed" ? "flat" : "outlined"}
            onPress={() => setTab("proposed")}
          >
            Proposed ({proposed.length})
          </Chip>
          <Chip
            style={styles.chip}
            mode={tab === "received" ? "flat" : "outlined"}
            onPress={() => setTab("received")}
          >
            Received ({received.length})
          </Chip>
        </View>
        {tab === "proposed" ? (
          isLoadingProposed ? (
            <Text>Loading...</Text>
          ) : !proposed.length ? (
            <Text>No Contracts Proposed</Text>
          ) : (
            <View style={styles.contracts}>
              {proposed.map((contract) => (
                <Pressable
                  key={contract.contractId}
                  onPress={() =>
                    navigation.navigate("Proposed Contract", { contract })
                  }
                >
                  <Contract contract={contract} />
                </Pressable>
              ))}
            </View>
          )
        ) : tab === "received" ? (
          isLoadingReceived ? (
            <Text>Loading...</Text>
          ) : !received.length ? (
            <Text>No Contracts Received</Text>
          ) : (
            <View style={styles.contracts}>
              {received.map((contract) => (
                <Pressable
                  key={contract.contractId}
                  onPress={() =>
                    navigation.navigate("Received Contract", { contract })
                  }
                >
                  <Contract contract={contract} />
                </Pressable>
              ))}
            </View>
          )
        ) : null}
      </ScrollView>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  totalEarned: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    marginTop: 16,
  },
  chips: {
    marginVertical: 16,
  },
  chip: {
    marginRight: 16,
  },
  contracts: {},
});

export default ContractListScreen;
