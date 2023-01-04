import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  PrivateRoute,
  SnackbarProviderActionType,
  useSnackbar,
} from "../providers";
import { useMutation } from "react-query";
import { applyCleaner } from "../mutations";
import ProfileForm from "../components/ProfileForm";

const RequestScreen = ({ navigation }) => {
  const { dispatchSnackbar } = useSnackbar();

  const mutationRes = useMutation({
    mutationFn: applyCleaner,
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
        message: "Successfully Applied!",
      });
      navigation.goBack();
    },
  });

  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Application to Become Cleaner</Text>
          <ProfileForm mutationRes={mutationRes} />
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
  form: {
    // width: "100%",
    paddingVertical: 24,
  },
  textGender: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    padding: 10,
    paddingTop: 30,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    // paddingLeft: 30,
  },
  radioButtonText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  photo: {
    paddingBottom: 30,
  },
  rectangleBorder: {
    borderColor: "#DDD",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    paddingVertical: 60,
    paddingBottom: 30,
    textAlign: "center",
  },
  photocopy: {
    height: 128,
    width: 128,
    borderColor: "salmon",
    position: "absolute",
    zIndex: 99,
    top: "100%",
    left: "100%",
  },
  button: {
    marginVertical: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    lineHeight: 24,
  },
  input: {
    paddingVertical: 8,
    fontSize: 20,
    textAlign: "center",
  },
  inputOutline: {
    borderRadius: 100,
    borderColor: "#AAA",
  },
  buttomPadding: {
    paddingTop: 30,
  },
});
export default RequestScreen;
