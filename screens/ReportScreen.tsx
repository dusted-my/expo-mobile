import { useRoute } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useMutation } from "react-query";
import { ICreateReportForm, ICustomer } from "../interfaces";
import { createReport } from "../mutations";
import {
  PrivateRoute,
  SnackbarProviderActionType,
  useAuthState,
  useSnackbar,
} from "../providers";
import { convertDateToTs, trimObjectStrings } from "../utils";

const options = [
  "Did not show up",
  "Cleaner seems unwell",
  "Improper Handling",
  "Attitude",
  "No Face Mask",
  "Missed Instructions",
];

const ReportScreen = ({ navigation }) => {
  const route = useRoute();
  const { cleaner }: { cleaner: ICustomer } = route.params as any;
  console.log("cleaner", cleaner);
  const { user } = useAuthState();
  const { dispatchSnackbar } = useSnackbar();

  const [issues, setIssues] = useState<string[]>([]);
  function select(value: string) {
    if (issues.includes(value)) {
      setIssues((issues) => issues.filter((selection) => selection !== value));
      return;
    }
    setIssues((issues) => issues.concat(value));
  }

  const [message, setMessage] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: createReport,
    onError: (e: any) =>
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: e.message || "Failed to Make Report",
      }),
    onSuccess: () => {
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "success",
        message: "Cleaner Reported",
      });
      navigation.navigate("Home");
    },
  });

  function handleSubmit() {
    const form: ICreateReportForm = {
      issues,
      message: message.trim(),
      cleanerDoc: `/users/${cleaner.id}` as const,
      clientDoc: `/users/${user.uid}` as const,
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
            <Text style={styles.title}>Report Cleaner</Text>
            <Image
              style={styles.cleaner}
              source={{ uri: cleaner.imageUrl }}
            ></Image>
            <Text style={styles.name}>{cleaner.fullName}</Text>
            <View style={styles.buttonsContainer}>
              {/*
               * create fake arrays with the half length of options
               *
               * example:
               * const options = ['a', 'b', 'c', 'e', 'f'];
               * => [undefined, undefined, undefined]
               *
               * explanation:
               * options has length of 5, and ceil(5 / 2) is 3,
               * therefore create a fake array with the length of 3
               */}
              {[...Array(Math.ceil(options.length / 2))].map((_, index) => (
                <View style={styles.buttonRow} key={`row-${index}`}>
                  {/*
                   * in each row, return 2 values based on current index * 2
                   * example:
                   * const index = 1;
                   * const options = ['a', 'b', 'c', 'e', 'f'];
                   * => ['c', 'e']
                   *
                   * explanation:
                   * if index is 1, then index * 2 is 2,
                   * therefore we slice options from index 2 and stop at index 4,
                   * hence ['c', 'e']
                   */}
                  {options.slice(index * 2, index * 2 + 2).map((option) => (
                    <Button
                      key={option}
                      style={[
                        styles.complaintButton,
                        issues.includes(option) && styles.issuesButton,
                      ]}
                      labelStyle={[
                        styles.complaintButtonLabel,
                        issues.includes(option) && styles.issuesButtonLabel,
                      ]}
                      mode="outlined"
                      onPress={() => select(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </View>
              ))}
            </View>
            <TextInput
              multiline
              numberOfLines={5}
              style={styles.message}
              outlineStyle={styles.messageOutline}
              placeholder="Tell us more about it"
              value={message}
              onChangeText={(text) => setMessage(text)}
              mode="outlined"
            />
            <View style={styles.buttomPadding}>
              <Button
                style={styles.button}
                labelStyle={styles.buttonLabel}
                buttonColor="#000000"
                mode="contained"
                onPress={handleSubmit}
                disabled={!issues.length || isLoading}
              >
                Submit
              </Button>
            </View>
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
  secondRow: {
    paddingLeft: 40,
  },
  buttonRow: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  complaintButton: {
    marginHorizontal: 10,
    borderColor: "#CCC",
  },
  issuesButton: {
    borderColor: "#000",
  },
  issuesButtonLabel: {
    color: "#000",
  },
  buttonsContainer: {
    padding: 10,
  },
  buttomPadding: {
    paddingTop: 10,
  },
  button: {
    marginVertical: 12,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 0,
  },
  complaintButtonLabel: {
    color: "#CCC",
  },
  text: {
    color: "#999",
    padding: 10,
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
  buttonLabel: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    lineHeight: 24,
    paddingHorizontal: 15,
  },
});

export default ReportScreen;
