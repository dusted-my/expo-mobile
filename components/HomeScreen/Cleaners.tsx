import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useQuery } from "react-query";
import Cleaner from "../Cleaner";
import { SnackbarProviderActionType, useSnackbar } from "../../providers";
import { getCleaners } from "../../queries";

const HomeScreenCleaners = ({ navigation }) => {
  const { dispatchSnackbar } = useSnackbar();

  const { data: cleaners, isLoading } = useQuery({
    queryFn: () => getCleaners(3),
    onError: () =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: "Unable to find cleaners",
      }),
  });

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Browse by Person</Text>
        <Button
          mode="text"
          textColor="gray"
          onPress={() => navigation.navigate("Cleaner List", {})}
        >
          View all
        </Button>
      </View>
      <ScrollView
        style={styles.horizontalScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {!isLoading && cleaners.length
          ? cleaners.map((cleaner, index) => (
              <View
                style={[
                  styles.cleanerContainer,
                  {
                    marginRight: index === cleaners.length - 1 ? 40 : 16,
                  },
                ]}
                key={cleaner.id}
              >
                <Cleaner cleaner={cleaner} />
              </View>
            ))
          : null}
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
  cleanerContainer: {
    marginRight: 16,
  },
});

export default HomeScreenCleaners;
