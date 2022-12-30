import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";

const options = [
  "Did not show up",
  "Cleaner seems unwell",
  "Improper Handling",
  "Attitude",
  "No Face Mask",
  "Missed Instructions",
];

const ReportScreen = ({ navigation }) => {
  const [selected, setSelected] = useState<string[]>([]);

  function select(value: string) {
    if (selected.includes(value)) {
      setSelected((selected) =>
        selected.filter((selection) => selection !== value)
      );
      return;
    }
    setSelected((selected) => selected.concat(value));
  }

  function handleSubmit() {
    alert(selected);
  }
  const [feedback, setFeedback] = useState("");

  return (
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
            source={require("../assets/cleaner.jpg")}
          ></Image>
          <Text style={styles.name}>Anna Jowel</Text>
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
                      selected.includes(option) && styles.selectedButton,
                    ]}
                    labelStyle={[
                      styles.complaintButtonLabel,
                      selected.includes(option) && styles.selectedButtonLabel,
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
            style={styles.feedback}
            outlineStyle={styles.feedbackOutline}
            placeholder="Tell us more about it"
            value={feedback}
            onChangeText={(text) => setFeedback(text)}
            mode="outlined"
          />
          <View style={styles.buttomPadding}>
            <Button
              style={styles.button}
              labelStyle={styles.buttonLabel}
              buttonColor="#000000"
              mode="contained"
              onPress={handleSubmit}
            >
              Submit
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
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
  selectedButton: {
    borderColor: "#000",
  },
  selectedButtonLabel: {
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
  feedback: {
    marginVertical: 12,
    fontSize: 20,
    width: "100%",
    height: 150,
    textAlignVertical: "top",
  },
  feedbackOutline: {
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
