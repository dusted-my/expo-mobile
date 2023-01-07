import * as Clipboard from "expo-clipboard";
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
import { Avatar, Button, MD2Colors } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { IContract } from "../interfaces";
import {
  PrivateRoute,
  SnackbarProviderActionType,
  useSnackbar,
} from "../providers";
import { getOneUser } from "../queries";
import { approveContract } from "../mutations";
import ContractStatus from "../components/ContractStatus";

const options = ["Credit/Debit", "Cash", "E-wallet"];

const ProposedContractScreen = ({ navigation }) => {
  const route = useRoute();
  const { contract }: { contract: IContract } = route.params as any;
  const { dispatchSnackbar } = useSnackbar();

  const {
    data: client,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: contract.clientDoc,
    queryFn: () => getOneUser(contract.clientDoc),
  });

  const [selected, setSelected] = useState("");

  function select(value: string) {
    setSelected(value);
  }

  const { mutate: mutateApprove, isLoading: isLoadingApprove } = useMutation({
    mutationFn: (approved: boolean) =>
      approveContract(contract.contractId, approved),
    onError: (e: any) =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: e.message || "Failed to Process Contract",
      }),
    onSuccess: (_, approved) => {
      navigation.navigate("Contract List");
      refetch();
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "success",
        message: `The Contract is ${approved ? "Approved" : "Declined"}`,
      });
    },
  });

  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView>
        {isLoading ? (
          <Text>Loading Content...</Text>
        ) : (
          <View style={styles.card}>
            <View style={styles.header}>
              <Image
                style={styles.logo}
                source={require("../assets/dusted.png")}
              ></Image>
              <Text style={styles.page}>Contract Details</Text>
              <View>
                {client.imageUrl ? (
                  <Image source={{ uri: client.imageUrl }} />
                ) : (
                  <Avatar.Text
                    style={styles.profile}
                    label={client.fullName
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word[0].toUpperCase())
                      .join("")}
                  />
                )}
                <Text style={styles.name}>{client.fullName}</Text>
              </View>
              <Text>Total:</Text>
              <Text style={styles.price}>RM {contract.total.toFixed(2)}</Text>
              <ContractStatus status={contract.status} />
            </View>
            <View style={styles.main}>
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
                  <Text style={styles.title}>Address: </Text>
                  <Text style={styles.details}>{contract.address}</Text>
                </View>
                <View>
                  <Text style={styles.title}>Service: </Text>
                  <Text
                    style={[styles.details, { textTransform: "capitalize" }]}
                  >
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
                  <Text style={styles.title}>Client Contact: </Text>
                  <Text style={[styles.details, styles.link]}>
                    {client.email}
                  </Text>
                </View>
                {contract.status === "client_submitted" ||
                contract.status === "cleaner_declined" ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      mode="outlined"
                      style={styles.button}
                      onPress={() => mutateApprove(false)}
                      disabled={
                        contract.status === "cleaner_declined" ||
                        isLoadingApprove
                      }
                    >
                      Decline
                    </Button>
                    <Button
                      mode="contained"
                      style={styles.button}
                      disabled={isLoadingApprove}
                      onPress={() => mutateApprove(true)}
                    >
                      Approve
                    </Button>
                  </View>
                ) : null}
                {contract.status === "cleaner_done" ? (
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
                ) : null}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    borderWidth: 1,
    borderColor: "#FFF",
    shadowColor: "000",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    resizeMode: "contain",
    height: 42.72,
    width: 181,
    marginLeft: 26,
  },
  main: {},
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
  },
  link: {
    color: MD2Colors.blue500,
    textDecorationLine: "underline",
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

export default ProposedContractScreen;
