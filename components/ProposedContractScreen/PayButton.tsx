import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useMutation } from "react-query";
import { IContract, ICustomer } from "../../interfaces";
import { confirmContract, fetchPaymentSheetParams } from "../../mutations";
import {
  SnackbarProviderActionType,
  useAuthState,
  useSnackbar,
} from "../../providers";
import { DISABLED_COLORS, GRADIENT_COLORS } from "../../utils";

interface Props {
  contract: IContract;
  cleaner: ICustomer;
  paymentOption: string;
  goBack: () => void;
}
const PayButton = (props: Props) => {
  const { contract, cleaner, paymentOption, goBack } = props;
  const { dispatchSnackbar } = useSnackbar();
  const { details } = useAuthState();

  const { mutate: mutateConfirm, isLoading: isLoadingConfirm } = useMutation({
    mutationFn: () => confirmContract(contract.contractId),
    onError: (e: any) =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: e.message || "Failed to Confirm Contract",
      }),
    onSuccess: () => {
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "success",
        message: "Your Contract is Confirmed",
      });
      goBack();
    },
  });

  const { mutate: mutatePayment, isLoading: isLoadingPayment } = useMutation({
    mutationFn: fetchPaymentSheetParams,
    onError: (e: any) =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: e.message || "Failed to Prepare Payment",
      }),
    onSuccess: (data) => displayPayment(data.clientSecret),
  });
  const handlePayment = () => {
    const { total, contractId } = contract;

    //* convert to Stripe amount standard
    const amount = total * 100;
    mutatePayment({ amount, contractId });
  };
  const displayPayment = async (clientSecret: string) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Dusted",
      paymentIntentClientSecret: clientSecret,
      returnURL: "dusted://paid",
      defaultBillingDetails: {
        email: details.email,
        name: details.fullName,
        address: {
          country: "MY",
        },
      },
    });
    if (error) {
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "info",
        message: error.message || "Failed to Make Payment",
      });
    }

    const { error: errorPresent } = await presentPaymentSheet();
    if (errorPresent) {
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "info",
        message: errorPresent.message || "Failed to Present Payment Layout",
      });
      return;
    }
  };

  return contract.status === "client_submitting" ? (
    paymentOption === "cash" ? (
      <TouchableOpacity
        onPress={() => mutateConfirm()}
        disabled={isLoadingConfirm}
      >
        <LinearGradient
          colors={isLoadingConfirm ? DISABLED_COLORS : GRADIENT_COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.9, y: 0.5 }}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>Confirm</Text>
        </LinearGradient>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => handlePayment()}
        disabled={isLoadingPayment}
      >
        <LinearGradient
          colors={isLoadingPayment ? DISABLED_COLORS : GRADIENT_COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.9, y: 0.5 }}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>Pay</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  ) : null;
};

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    borderRadius: 100,
    borderWidth: 0,
    paddingVertical: 16,
  },
  buttonLabel: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default PayButton;
