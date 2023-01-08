import { useRoute } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { useMutation } from "react-query";
import {
  IContract,
  ICreateFeedbackForm,
  ICreateReportForm,
  ICustomer,
} from "../interfaces";
import { createFeedback, createReport } from "../mutations";
import {
  PrivateRoute,
  SnackbarProviderActionType,
  useAuthState,
  useSnackbar,
} from "../providers";
import { convertDateToTs, trimObjectStrings } from "../utils";

const FeedbackScreen = ({ navigation }) => {
  const route = useRoute();
  const { cleaner, contract }: { cleaner: ICustomer; contract: IContract } =
    route.params as any;
  const { user } = useAuthState();
  const { dispatchSnackbar } = useSnackbar();

  const [stars, setStars] = useState(5);
  const [message, setMessage] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: createFeedback,
    onError: (e: any) =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: e.message || "Failed to Give Feedback",
      }),
    onSuccess: () => {
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "success",
        message: "Feedback Submitted!",
      });
      navigation.navigate("Contract List");
    },
  });

  function handleSubmit() {
    const form: ICreateFeedbackForm = {
      stars,
      message: message.trim(),
      cleanerDoc: `/users/${cleaner.id}` as const,
      clientDoc: `/users/${user.uid}` as const,
      contractDoc: `/contracts/${contract.contractId}` as const,
      status: "active",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    mutate(form);
  }

  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.body}>
            <Image
              style={styles.logo}
              source={require("../assets/dusted.png")}
            ></Image>
            <Text style={styles.title}>Give a Feedback</Text>
            <Image
              style={styles.cleaner}
              source={{ uri: cleaner.imageUrl }}
            ></Image>
            <Text style={styles.name}>{cleaner.fullName}</Text>
          </View>

          <View>
            <Text style={styles.label}>Ratings: </Text>
            <AirbnbRating
              defaultRating={stars}
              onFinishRating={(val) => setStars(val)}
            />
            <Text style={styles.label}>Feedback: </Text>
            <TextInput
              multiline
              numberOfLines={5}
              style={styles.message}
              outlineStyle={styles.messageOutline}
              placeholder="Punctual, Experienced, Fast..."
              value={message}
              onChangeText={(text) => setMessage(text)}
              mode="outlined"
            />
            <Button
              style={styles.button}
              labelStyle={styles.buttonLabel}
              buttonColor="#000000"
              mode="contained"
              onPress={handleSubmit}
              disabled={!message || isLoading}
            >
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </PrivateRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    justifyContent: "space-between",
    height: "100%",
    padding: 32,
    paddingBottom: 50,
  },
  body: {
    alignItems: "center",
  },
  logo: {
    // marginTop: "40%",
    resizeMode: "contain",
    height: 42.72,
    width: 181,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter_500Medium",
    paddingVertical: 24,
  },
  name: {
    fontSize: 20,
    fontFamily: "Inter_500Medium",
    paddingVertical: 10,
  },
  cleaner: {
    width: 111,
    height: 111,
    borderRadius: 100,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: "500",
  },
  message: {
    marginVertical: 12,
    fontSize: 20,
    width: "100%",
    height: 150,
    textAlignVertical: "top",
  },
  messageOutline: {
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 10,
  },
  button: {
    marginVertical: 24,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    lineHeight: 24,
    paddingHorizontal: 15,
  },
});

export default FeedbackScreen;
