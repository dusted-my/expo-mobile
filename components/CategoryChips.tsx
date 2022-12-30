import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import { mockCategories } from "../mocks";

interface Props {
  handlePress: (category: string) => void;
  selected?: string;
}
const CategoryChips = (props: Props) => {
  const { handlePress, selected } = props;

  return (
    <ScrollView
      style={styles.horizontalScroll}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {mockCategories.map((category, index) => (
        <Chip
          style={[
            selected === category
              ? styles.selectedCategoryChip
              : styles.categoryChip,
            {
              marginRight: index === mockCategories.length - 1 ? 40 : 16,
            },
          ]}
          textStyle={
            selected === category
              ? styles.selectedCategoryChipText
              : styles.categoryChipText
          }
          mode="outlined"
          key={category}
          onPress={() => handlePress(category)}
        >
          {category}
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
  categoryChip: {
    marginRight: 16,
    borderRadius: 50,
    borderColor: "#000",
    backgroundColor: "#0000",
  },
  categoryChipText: {
    color: "#000",
    textTransform: "capitalize",
  },
  selectedCategoryChip: {
    marginRight: 16,
    borderRadius: 50,
    borderColor: "#000",
    backgroundColor: "#000",
  },
  selectedCategoryChipText: {
    color: "#FFF",
    textTransform: "capitalize",
  },
});

export default CategoryChips;
