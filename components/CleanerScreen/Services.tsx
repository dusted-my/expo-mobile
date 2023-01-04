import React from "react";
import { StyleSheet, View } from "react-native";
import { HelperText, MD2Colors, Text } from "react-native-paper";
import ServiceChips from "../ServiceChips";

interface Props {
  cleanerServices: string[];
  serviceSelected: string;
  setSelected: (value: string) => void;
  onTouched: (e: any) => void;
  error: string;
  touched: boolean;
}
const Services = (props: Props) => {
  const {
    serviceSelected,
    setSelected,
    cleanerServices,
    onTouched,
    error,
    touched,
  } = props;

  return (
    <View onTouchStart={onTouched}>
      <Text style={styles.title}>
        Services <Text style={styles.description}>Select 1</Text>
      </Text>
      <ServiceChips
        selected={[serviceSelected]}
        handlePress={setSelected}
        filteredServices={cleanerServices}
      />
      <HelperText type="error" visible={error && touched}>
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
});

export default Services;
