import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button, Chip } from "react-native-paper";
import { mockCategories } from "../../mocks";

const HomeScreenCategories = ({ navigation }) => {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Categories</Text>
        <Button
          mode="text"
          textColor="gray"
          onPress={() => navigation.navigate("Cleaner List")}
        >
          View all
        </Button>
      </View>
      <ScrollView
        style={styles.horizontalScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {mockCategories.map((category, index) => (
          <Chip
            style={[
              styles.categoryChip,
              {
                marginRight: index === mockCategories.length - 1 ? 40 : 16,
              },
            ]}
            textStyle={styles.categoryChipText}
            mode="outlined"
            key={category}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
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
});

export default HomeScreenCategories;
