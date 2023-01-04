import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import { mockServices } from "../mocks";

interface Props {
  handlePress: (service: string) => void;
  selected?: string[];
  filteredServices?: string[];
}
const ServiceChips = (props: Props) => {
  const { handlePress, selected, filteredServices } = props;

  const services = filteredServices || mockServices;

  return (
    <ScrollView
      style={styles.horizontalScroll}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {services.map((service, index) => (
        <Chip
          style={[
            selected?.includes(service)
              ? styles.selectedServiceChip
              : styles.serviceChip,
            {
              marginRight: index === mockServices.length - 1 ? 40 : 16,
            },
          ]}
          textStyle={
            selected?.includes(service)
              ? styles.selectedServiceChipText
              : styles.serviceChipText
          }
          mode="outlined"
          key={service}
          onPress={() => handlePress(service)}
        >
          {service}
        </Chip>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalScroll: {
    marginTop: 8,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  serviceChip: {
    marginRight: 16,
    borderRadius: 50,
    borderColor: "#000",
    backgroundColor: "#0000",
  },
  serviceChipText: {
    color: "#000",
    textTransform: "capitalize",
  },
  selectedServiceChip: {
    marginRight: 16,
    borderRadius: 50,
    borderColor: "#000",
    backgroundColor: "#000",
  },
  selectedServiceChipText: {
    color: "#FFF",
    textTransform: "capitalize",
  },
});

export default ServiceChips;
