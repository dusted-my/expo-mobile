import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Divider, List, Text } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

type Field = "date" | "startAt" | "endAt";

interface Props {
  date: number;
  startAt: number;
  endAt: number;
  setFieldValue: (field: Field, value: number) => void;
}
const Schedule = (props: Props) => {
  const { date, startAt, endAt, setFieldValue } = props;

  const handleChange = (field: Field, newValue: Date) =>
    setFieldValue(field, dayjs(newValue).valueOf());

  const handleToggle = (field: Field, value: number, mode: "date" | "time") => {
    DateTimePickerAndroid.open({
      mode,
      value: dayjs(value).toDate(),
      onChange: (e, newValue) => handleChange(field, newValue),
    });
  };

  const isAndroid = Platform.OS === "android";

  return (
    <View>
      <Text style={styles.title}>Schedule</Text>
      <View style={styles.schedule}>
        <View style={styles.section}>
          <List.Icon style={styles.icon} color="#000" icon="calendar" />
          <View
            style={{ flexDirection: isAndroid ? "column" : "row", flex: 1 }}
          >
            <Text style={styles.scheduleName}>Date</Text>
            {isAndroid ? (
              <Pressable onPress={() => handleToggle("date", date, "date")}>
                <Text style={styles.scheduleChosen}>
                  {dayjs(date).format("ddd, D MMM YYYY")}
                </Text>
              </Pressable>
            ) : (
              <DateTimePicker
                style={styles.iosDateTimePicker}
                value={dayjs(date).toDate()}
                mode="date"
                minimumDate={dayjs().toDate()}
                onChange={(e, newValue) => handleChange("date", newValue)}
              />
            )}
          </View>
        </View>
        <Divider style={styles.scheduleDivider}></Divider>
        <View style={styles.section}>
          <List.Icon style={styles.icon} color="#000" icon="clock-in" />
          <View
            style={{ flexDirection: isAndroid ? "column" : "row", flex: 1 }}
          >
            <Text style={styles.scheduleName}>Start At</Text>
            {isAndroid ? (
              <Pressable
                onPress={() => handleToggle("startAt", startAt, "time")}
              >
                <Text style={styles.scheduleChosen}>
                  {dayjs(startAt).format("hh:mm a")}
                </Text>
              </Pressable>
            ) : (
              <DateTimePicker
                style={styles.iosDateTimePicker}
                value={dayjs(startAt).toDate()}
                mode="time"
                onChange={(e, newValue) => handleChange("startAt", newValue)}
              />
            )}
          </View>
        </View>
        <Divider style={styles.scheduleDivider}></Divider>
        <View style={styles.section}>
          <List.Icon style={styles.icon} color="#000" icon="clock-out" />
          <View
            style={{ flexDirection: isAndroid ? "column" : "row", flex: 1 }}
          >
            <Text style={styles.scheduleName}>End At</Text>
            {isAndroid ? (
              <Pressable onPress={() => handleToggle("endAt", endAt, "time")}>
                <Text style={styles.scheduleChosen}>
                  {dayjs(endAt).format("hh:mm a")}
                </Text>
              </Pressable>
            ) : (
              <DateTimePicker
                style={styles.iosDateTimePicker}
                value={dayjs(endAt).toDate()}
                mode="time"
                onChange={(e, newValue) => handleChange("endAt", newValue)}
              />
            )}
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
    alignItems: "center",
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
  iosDateTimePicker: {
    flex: 1,
  },
});

export default Schedule;
