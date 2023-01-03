import React from "react";
import { StyleSheet, View } from "react-native";
import { HelperText, MD2Colors, Text, TextInput } from "react-native-paper";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  error: string;
  touched: boolean;
  suggestedTotal: number;
}
const Total = (props: Props) => {
  const { value, onChangeText, onBlur, error, touched, suggestedTotal } = props;

  return (
    <View>
      <Text style={styles.title}>
        Total (RM)<Text style={styles.description}>Required</Text>
      </Text>
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
        outlineStyle={styles.inputOutline}
        placeholder="Enter total"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
      <HelperText type={+value < suggestedTotal ? "error" : "info"} visible>
        Suggested Amount Based on Hourly Rate: RM {suggestedTotal.toFixed(2)}
      </HelperText>
      <HelperText type="error" visible={Boolean(error && touched)}>
        {error}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: MD2Colors.grey500,
  },
  input: {
    fontSize: 16,
    width: "100%",
    textAlignVertical: "top",
  },
  inputOutline: {
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 10,
  },
});

export default Total;
