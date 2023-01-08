import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { IContract } from "../../interfaces";
import { DISABLED_COLORS, GRADIENT_COLORS } from "../../utils";

interface Props {
  gaveFeedback: boolean;
  status: IContract["status"];
  goFeedback: () => void;
}
const FeedbackButton = (props: Props) => {
  const { gaveFeedback, status, goFeedback } = props;

  return status === "client_done" && !gaveFeedback ? (
    <TouchableOpacity onPress={() => goFeedback()}>
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 0.5 }}
        style={styles.button}
      >
        <Text style={styles.buttonLabel}>Give Feedback</Text>
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <LinearGradient
      colors={DISABLED_COLORS}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.9, y: 0.5 }}
      style={styles.button}
    >
      <Text style={styles.buttonLabel}>Submitted Feedback</Text>
    </LinearGradient>
  );
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

export default FeedbackButton;
