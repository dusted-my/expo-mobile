import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useQuery } from "react-query";
import CategoryChips from "../components/CategoryChips";
import Cleaner from "../components/Cleaner";
import { mockCategories } from "../mocks";
import { SnackbarProviderActionType, useSnackbar } from "../providers";
import { getCleaners } from "../queries";

const CleanerListScreen = ({ navigation }) => {
  const { dispatchSnackbar } = useSnackbar();
  const route = useRoute();

  const { data: cleaners, isLoading } = useQuery({
    queryFn: () => getCleaners(),
    onError: () =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: "Unable to find cleaners",
      }),
  });

  const { category }: any = route.params;
  const [selected, setSelected] = useState<string>(category || "");
  const handleSelect = (category: string) =>
    setSelected((selected) => {
      if (selected === category) return "";
      if (!mockCategories.includes(category)) return "";
      return category;
    });

  const filteredCleaners = selected
    ? cleaners.filter((cleaner) => {
        if (!cleaner.categories) return false;
        if (!cleaner.categories.includes(selected)) return false;
        return true;
      })
    : cleaners;

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Filter by Category</Text>
        </View>
        <CategoryChips selected={selected} handlePress={handleSelect} />
      </View>

      <View style={styles.cleaners}>
        {!isLoading ? (
          filteredCleaners.length ? (
            filteredCleaners.map((cleaner) => (
              <View style={styles.cleanerContainer} key={cleaner.id}>
                <Cleaner cleaner={cleaner} />
              </View>
            ))
          ) : (
            <Text>No Cleaners Found</Text>
          )
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 32,
    paddingBottom: 50,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cleaners: {
    marginVertical: 32,
  },
  cleanerContainer: {
    marginBottom: 16,
  },
});

export default CleanerListScreen;
