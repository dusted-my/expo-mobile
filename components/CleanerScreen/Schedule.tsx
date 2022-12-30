import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, List, Text } from "react-native-paper";

const Schedule = () => {
  return (
    <View>
      <Text style={styles.title}>Schedule</Text>
      <View style={styles.schedule}>
        <View style={styles.section}>
          <List.Icon style={styles.icon} color="#000" icon="calendar" />
          <View>
            <Text style={styles.scheduleName}>Date</Text>
            <Text style={styles.scheduleChosen}>Wednesday, 18 Dec 2022</Text>
          </View>
        </View>
        <Divider style={styles.scheduleDivider}></Divider>
        <View style={styles.section}>
          <List.Icon
            style={styles.icon}
            color="#000"
            icon="clock-time-four-outline"
          />
          <View>
            <Text style={styles.scheduleName}>Time</Text>
            <Text style={styles.scheduleChosen}>08:00am - 15:00pm</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    marginTop: 24,
    marginBottom: 8,
  },
  schedule: {
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#FFF",
  },
  section: {
    flexDirection: "row",
  },
  icon: {
    paddingLeft: 8,
    paddingRight: 24,
  },
  scheduleName: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 5,
  },
  scheduleChosen: {
    marginBottom: 5,
    color: "#006AFF",
  },
  scheduleDivider: {
    marginLeft: 54,
    borderColor: "#DADADA",
    marginVertical: 8,
  },
});

export default Schedule;
