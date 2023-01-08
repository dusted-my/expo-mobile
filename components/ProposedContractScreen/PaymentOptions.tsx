import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { IContract } from "../../interfaces";
import { PAYMENT_OPTIONS } from "../../screens/ProposedContractScreen";

interface Props {
  status: IContract["status"];
  paymentOption: string;
  handleSelectPaymentOption: (option: string) => void;
}
const PaymentOptions = (props: Props) => {
  const { status, paymentOption, handleSelectPaymentOption } = props;

  return status === "client_submitting" ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {PAYMENT_OPTIONS.map((option) => (
        <Button
          key={option}
          style={[
            styles.button,
            paymentOption === option && styles.selectedButton,
          ]}
          labelStyle={[
            styles.buttonLabel,
            paymentOption === option && styles.selectedButtonLabel,
          ]}
          mode="outlined"
          onPress={() => handleSelectPaymentOption(option)}
        >
          {option}
        </Button>
      ))}
    </ScrollView>
  ) : null;
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
    borderColor: "#CCC",
  },
  selectedButton: {
    borderColor: "#000",
  },
  buttonLabel: {
    color: "#CCC",
    textTransform: "capitalize",
  },
  selectedButtonLabel: {
    color: "#000",
  },
});

export default PaymentOptions;
