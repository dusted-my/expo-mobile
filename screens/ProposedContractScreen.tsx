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
  Linking,
} from "react-native";
import { Button, MD2Colors } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { IContract } from "../interfaces";
import {
  PrivateRoute,
  SnackbarProviderActionType,
  useAuthState,
  useSnackbar,
} from "../providers";
import { getOneUser } from "../queries";
import {
  clientDoneContract,
  confirmContract,
  fetchPaymentSheetParams,
} from "../mutations";
import ContractStatus from "../components/ContractStatus";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import Header from "../components/ProposedContractScreen/Header";
import PaymentOptions from "../components/ProposedContractScreen/PaymentOptions";
import Details from "../components/ProposedContractScreen/Details";
import PayButton from "../components/ProposedContractScreen/PayButton";
import DoneButton from "../components/ProposedContractScreen/DoneButton";

type PaymentOption = "card" | "ewallet" | "cash";
export const PAYMENT_OPTIONS: PaymentOption[] = ["card", "ewallet", "cash"];

const ProposedContractScreen = ({ navigation }) => {
  const route = useRoute();
  const { contract }: { contract: IContract } = route.params as any;
  const { dispatchSnackbar } = useSnackbar();
  const { details } = useAuthState();

  const { data: cleaner, isLoading } = useQuery({
    queryKey: contract.cleanerDoc,
    queryFn: () => getOneUser(contract.cleanerDoc),
  });

  const [paymentOption, setPaymentOption] = useState<PaymentOption>(
    PAYMENT_OPTIONS[0]
  );

  function handleSelectPaymentOption(value: PaymentOption) {
    setPaymentOption(value);
  }

  const goBack = () => navigation.navigate("Contract List");

  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView>
        {isLoading ? (
          <Text>Loading Content...</Text>
        ) : (
          <View style={styles.card}>
            <Header cleaner={cleaner} contract={contract} />
            <View style={styles.main}>
              <PaymentOptions
                status={contract.status}
                paymentOption={paymentOption}
                handleSelectPaymentOption={handleSelectPaymentOption}
              />
              <Details contract={contract} cleaner={cleaner} />
              <PayButton
                contract={contract}
                cleaner={cleaner}
                paymentOption={paymentOption}
                goBack={goBack}
              />
              <DoneButton contract={contract} goBack={goBack} />
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
  main: { marginTop: 32 },
  information: {
    alignItems: "center",
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
