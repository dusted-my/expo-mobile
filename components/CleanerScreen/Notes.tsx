import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}
const Notes = (props: Props) => {
  const { value, onChangeText } = props;

  return (
    <View>
      <Text style={styles.title}>Notes</Text>
      <TextInput
        multiline
        numberOfLines={5}
        style={styles.input}
        outlineStyle={styles.inputOutline}
        placeholder="Any notes for us? "
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
      />
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

export default Notes;
