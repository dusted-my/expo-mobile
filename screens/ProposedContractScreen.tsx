import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { IContract } from "../interfaces";
import { PrivateRoute } from "../providers";
import { getOneUser } from "../queries";
import Header from "../components/ProposedContractScreen/Header";
import PaymentOptions from "../components/ProposedContractScreen/PaymentOptions";
import Details from "../components/ProposedContractScreen/Details";
import PayButton from "../components/ProposedContractScreen/PayButton";
import DoneButton from "../components/ProposedContractScreen/DoneButton";
import ReportCleanerButton from "../components/ProposedContractScreen/ReportCleanerButton";

type PaymentOption = "card" | "ewallet" | "cash";
export const PAYMENT_OPTIONS: PaymentOption[] = ["card", "cash"];

const ProposedContractScreen = ({ navigation }) => {
  const route = useRoute();
  const { contract }: { contract: IContract } = route.params as any;

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
              <ReportCleanerButton
                status={contract.status}
                goReport={() => navigation.navigate("Report", { cleaner })}
              />
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
});

export default ProposedContractScreen;
