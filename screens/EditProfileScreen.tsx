import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  PrivateRoute,
  SnackbarProviderActionType,
  useSnackbar,
} from "../providers";
import { useMutation } from "react-query";
import { editCustomer } from "../mutations";
import ProfileForm from "../components/ProfileForm";

const RequestScreen = ({ navigation }) => {
  const { dispatchSnackbar } = useSnackbar();

  const mutationRes = useMutation({
    mutationFn: editCustomer,
    onError: (e: any) =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: e.message,
      }),
    onSuccess: () => {
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "success",
        message: "Successfully Edited Profile!",
      });
      navigation.goBack();
    },
  });

  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Edit Profile</Text>
          <ProfileForm isEdit mutationRes={mutationRes} />
        </View>
      </ScrollView>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  title: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
});

export default RequestScreen;
