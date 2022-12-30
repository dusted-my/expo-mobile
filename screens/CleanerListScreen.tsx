import React from "react";
import { View, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import Cleaner from "../components/Cleaner";
import { SnackbarProviderActionType, useSnackbar } from "../providers";
import { getCleaners } from "../queries";

const CleanerListScreen = () => {
  const { dispatchSnackbar } = useSnackbar();

  const { data: cleaners, isLoading } = useQuery({
    queryFn: getCleaners,
    onError: () =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: "Unable to find cleaners",
      }),
  });

  return (
    <View style={styles.container}>
      {!isLoading && cleaners
        ? cleaners.map((cleaner) => (
            <View style={styles.cleanerContainer} key={cleaner.id}>
              <Cleaner cleaner={cleaner} />
            </View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 32,
    paddingBottom: 50,
  },
  cleanerContainer: {
    marginBottom: 16,
  },
});

export default CleanerListScreen;
