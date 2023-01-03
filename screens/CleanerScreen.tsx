import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { startAt, Timestamp } from "firebase/firestore";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Divider, MD2Colors } from "react-native-paper";
import Address from "../components/CleanerScreen/Address";
import Notes from "../components/CleanerScreen/Notes";
import Profile from "../components/CleanerScreen/Profile";
import Schedule from "../components/CleanerScreen/Schedule";
import Services from "../components/CleanerScreen/Services";
import { Contract, ICleaner } from "../interfaces";
import { trimObjectStrings } from "../utils";
import * as yup from "yup";

interface Form {
  address: string;
  notes: string;
  total: number;
  serviceRequired: string;
  date: number;
  startAt: number;
  endAt: number;
}

const initialValues: Form = {
  address: "",
  notes: "",
  total: 0.0,
  serviceRequired: "",
  date: dayjs().valueOf(),
  startAt: dayjs().valueOf(),
  endAt: dayjs().valueOf(),
};

const validationSchema = yup.object({
  address: yup.string().required("Address is required"),
  serviceRequired: yup.string().required("Service is required"),
  total: yup.number().required(),
});

const CleanerScreen = ({ navigation }) => {
  const route = useRoute();
  const { cleaner }: { cleaner: ICleaner } = route.params as any;

  function handleSubmit(values: Form) {
    const trimmedValues = trimObjectStrings(values);
    const { address, notes, total, serviceRequired, date, startAt, endAt } =
      trimmedValues;

    const s = dayjs(startAt);
    const e = dayjs(endAt);
    const startAtTs = Timestamp.fromDate(
      dayjs(date).set("hour", s.hour()).set("minute", s.minute()).toDate()
    );
    const endAtTs = Timestamp.fromDate(
      dayjs(date).set("hour", e.hour()).set("minute", e.minute()).toDate()
    );

    const newContract: Contract = {
      address,
      notes,
      total,
      serviceRequired,
      cleanerDoc: `/users/${cleaner.id}`,
      clientDoc: `/users/${""}`,
      startAt: startAtTs,
      endAt: endAtTs,
      paymentStatus: "not_applicable",
      status: "client_submitting",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    console.log(newContract);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Profile cleaner={cleaner} />
        <Divider style={styles.divider}></Divider>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            values,
            dirty,
            isValid,
            isSubmitting,
          }) => {
            const disableSubmit = !dirty || !isValid || isSubmitting;
            return (
              <>
                <Address
                  value={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("email")}
                  error={errors.address}
                  touched={touched.address}
                />
                <Services
                  cleanerServices={cleaner.categories}
                  serviceSelected={values.serviceRequired}
                  setSelected={(value) => {
                    const selected = values.serviceRequired;
                    if (selected === value) {
                      return setFieldValue("serviceRequired", "");
                    }
                    setFieldValue("serviceRequired", value);
                  }}
                  onTouched={handleBlur("serviceRequired")}
                  error={errors.serviceRequired}
                  touched={touched.serviceRequired}
                />
                <Schedule
                  date={values.date}
                  startAt={values.startAt}
                  endAt={values.endAt}
                  setFieldValue={setFieldValue}
                />
                <Notes
                  value={values.notes}
                  onChangeText={handleChange("notes")}
                />
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={disableSubmit}
                >
                  <LinearGradient
                    colors={
                      disableSubmit
                        ? [MD2Colors.grey300, MD2Colors.grey300]
                        : ["#FF70AF", "#5F48F5"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.9, y: 0.5 }}
                    style={[styles.button, styles.buttonBook]}
                  >
                    <Text style={styles.buttonLabelBook}>Book</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  body: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
  },
  profileDescription: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  profileMessage: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  message: {
    marginRight: 30,
  },
  divider: {
    borderWidth: 1,
    borderColor: "#DADADA",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    paddingTop: 5,
    paddingBottom: 16,
  },
  address: {
    marginVertical: 2,
    fontSize: 16,
    width: "100%",
    height: 130,
    textAlignVertical: "top",
  },
  addressOutline: {
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 10,
    marginBottom: 18,
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
  buttonLabel: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    lineHeight: 24,
    paddingHorizontal: 15,
  },
  complaintButtonLabel: {
    color: "#CCC",
  },
  schedule: {
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#FFF",
  },
  scheduleName: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 5,
  },
  schduleChosen: {
    marginBottom: 5,
    color: "#006AFF",
  },
  scheduleDivider: {
    width: "70%",
    borderColor: "#DADADA",
    marginLeft: 80,
    marginRight: 24,
    marginVertical: 2,
  },
  buttomPadding: {
    paddingTop: 10,
  },
  button: {
    marginVertical: 20,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 0,
  },
  buttonBook: {
    paddingVertical: 16,
  },
  buttonLabelBook: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default CleanerScreen;
