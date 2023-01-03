import React from "react";
import { StyleSheet, View } from "react-native";
import { HelperText, MD2Colors, Text, TextInput } from "react-native-paper";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  error: string;
  touched: boolean;
}
const Address = (props: Props) => {
  const { value, onChangeText, onBlur, error, touched } = props;

  return (
    <View>
      <Text style={styles.title}>
        Address <Text style={styles.description}>Required</Text>
      </Text>
      <TextInput
        multiline
        mode="outlined"
        numberOfLines={5}
        style={styles.input}
        outlineStyle={styles.inputOutline}
        placeholder="Enter address"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
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
    height: 130,
    textAlignVertical: "top",
  },
  inputOutline: {
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 10,
  },
});

export default Address;
