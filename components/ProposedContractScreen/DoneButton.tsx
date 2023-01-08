import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useMutation } from "react-query";
import { IContract } from "../../interfaces";
import { clientDoneContract } from "../../mutations";
import { SnackbarProviderActionType, useSnackbar } from "../../providers";
import { DISABLED_COLORS, GRADIENT_COLORS } from "../../utils";

interface Props {
  contract: IContract;
  goBack: () => void;
}
const DoneButton = (props: Props) => {
  const { contract, goBack } = props;
  const { dispatchSnackbar } = useSnackbar();

  const { mutate: mutateDone, isLoading: isLoadingDone } = useMutation({
    mutationFn: () => clientDoneContract(contract.contractId),
    onError: (e: any) =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: e.message || "Failed to Done Contract",
      }),
    onSuccess: () => {
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "success",
        message: `The Contract is marked as Done!`,
      });
      goBack();
    },
  });

  return contract.status === "cleaner_done" ? (
    <TouchableOpacity onPress={() => mutateDone()} disabled={isLoadingDone}>
      <LinearGradient
        colors={isLoadingDone ? DISABLED_COLORS : GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 0.5 }}
        style={styles.button}
      >
        <Text style={styles.buttonLabel}>Confirm Done</Text>
      </LinearGradient>
    </TouchableOpacity>
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

export default DoneButton;
