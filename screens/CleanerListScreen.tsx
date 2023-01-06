import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { useQuery } from "react-query";
import ServiceChips from "../components/ServiceChips";
import Cleaner from "../components/Cleaner";
import { mockServices } from "../mocks";
import {
  SnackbarProviderActionType,
  useAuthState,
  useSnackbar,
} from "../providers";
import { PrivateRoute } from "../providers";
import { getCleaners } from "../queries";

const CleanerListScreen = ({ navigation }) => {
  const { dispatchSnackbar } = useSnackbar();
  const { user } = useAuthState();
  const route = useRoute();

  const { data: cleaners, isLoading } = useQuery({
    queryFn: () => getCleaners(user.uid),
    onError: () =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: "Unable to find cleaners",
      }),
  });

  const { service }: any = route.params;
  const [selected, setSelected] = useState<string>(service || "");
  const handleSelect = (service: string) =>
    setSelected((selected) => {
      if (selected === service) return "";
      if (!mockServices.includes(service)) return "";
      return service;
    });

  const filteredCleaners = selected
    ? cleaners.filter((cleaner) => {
        if (!cleaner.services) return false;
        if (!cleaner.services.includes(selected)) return false;
        return true;
      })
    : cleaners;

  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Filter by Service</Text>
          </View>
          <ServiceChips selected={[selected]} handlePress={handleSelect} />
        </View>
        <View style={styles.cleaners}>
          {!isLoading ? (
            filteredCleaners.length ? (
              filteredCleaners.map((cleaner) => (
                <Pressable
                  style={styles.cleanerContainer}
                  key={cleaner.id}
                  onPress={() => navigation.navigate("Cleaner", { cleaner })}
                >
                  <Cleaner cleaner={cleaner} />
                </Pressable>
              ))
            ) : (
              <Text>No Cleaners Found</Text>
            )
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </ScrollView>
    </PrivateRoute>
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
