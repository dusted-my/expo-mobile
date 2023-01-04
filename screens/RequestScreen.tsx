import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  Button,
  HelperText,
  MD2Colors,
  RadioButton,
  TextInput,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  PrivateRoute,
  SnackbarProviderActionType,
  useAuthState,
  useSnackbar,
} from "../providers";
import ServiceChips from "../components/ServiceChips";
import { Formik } from "formik";
import * as yup from "yup";
import {
  getDownloadURL,
  ref,
  StorageError,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { storage } from "../firebase/config";
import { useMutation } from "react-query";
import { applyCleaner } from "../mutations";
import { trimObjectStrings } from "../utils";
import { IApplyCleanerForm, ICleaner } from "../interfaces";

const initialValues: IApplyCleanerForm = {
  uid: "",
  fullName: "",
  nric: "",
  address: "",
  hourlyRate: "",
  gender: "others",
  imageUrl: "",
  nricFrontImageUrl: "",
  nricBackImageUrl: "",
  services: [],
  status: "pending_cleaner",
};
const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("NRIC Name is required")
    .min(3, "Must have at least 3 characters")
    .max(255, "Must have at most 255 characters"),
  nric: yup
    .string()
    .required("NRIC Number is required")
    .matches(/[0-9]{12}/, "Must be numbers")
    .test("length", "Must be 12 numbers", (val: string) => val.length === 12),
  address: yup
    .string()
    .required("Address is required")
    .max(255, "Must have at most 255 characters"),
  hourlyRate: yup.number().required("Hourly Rate is required"),
  imageUrl: yup.string().required("Profile Picture is required"),
  nricFrontImageUrl: yup.string().required("NRIC Front is required"),
  nricBackImageUrl: yup.string().required("NRIC Back is required"),
});

type ImageType = "profile" | "nric-front" | "nric-back";
interface ImageStatus {
  uploading: boolean;
  progress: string;
}

const RequestScreen = ({ navigation }) => {
  const { user } = useAuthState();

  const [status, setStatus] = useState<Record<ImageType, ImageStatus>>({
    profile: { uploading: false, progress: "" },
    "nric-front": { uploading: false, progress: "" },
    "nric-back": { uploading: false, progress: "" },
  });
  const { dispatchSnackbar } = useSnackbar();

  const [selected, setSelected] = useState<string[]>([]);
  const handleSelect = (service: string) => {
    if (selected.includes(service)) {
      setSelected((selected) =>
        selected.filter((selection) => selection !== service)
      );
      return;
    }
    setSelected((selected) => selected.concat(service));
  };

  const pickImage = async (
    type: ImageType,
    setValue: (url: string) => void
  ) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (result.canceled) return;

    const imageRef = ref(storage, `${user.uid}-${type}.jpg`);
    try {
      const img = await fetch(result.assets[0].uri);
      const blob = await img.blob();

      const uploadTask = uploadBytesResumable(imageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(2);
          setStatus((status) => ({
            ...status,
            [type]: { uploading: true, progress },
          }));
        },
        (error) => {
          dispatchSnackbar({
            type: SnackbarProviderActionType.OPEN,
            variant: "error",
            message: error.message,
          });
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setValue(url);
          setStatus((status) => ({
            ...status,
            [type]: { uploading: false, progress: "0" },
          }));
        }
      );
    } catch (e: any) {
      dispatchSnackbar({
        type: SnackbarProviderActionType.OPEN,
        variant: "error",
        message: e.message,
      });
    }
  };

  const { mutate, isLoading } = useMutation({
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

  function handleSubmit(values: IApplyCleanerForm) {
    const trimmedValues = trimObjectStrings(values);
    mutate({ ...trimmedValues, uid: user.uid });
  }

  return (
    <PrivateRoute navigation={navigation}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Application to Become Cleaner</Text>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
              values,
              dirty,
              isValid,
            }) => (
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  placeholder="NRIC Name"
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={(e: any) => {
                    handleBlur("fullName")(e);
                    console.log("errors", values.fullName);
                  }}
                  mode="outlined"
                  error={Boolean(errors.fullName && touched.fullName)}
                />
                <HelperText
                  type="error"
                  visible={Boolean(errors.fullName && touched.fullName)}
                >
                  {errors.fullName}
                </HelperText>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  placeholder="NRIC Number"
                  value={values.nric}
                  onChangeText={handleChange("nric")}
                  onBlur={handleBlur("nric")}
                  error={Boolean(errors.nric && touched.nric)}
                  mode="outlined"
                />
                <HelperText
                  type="error"
                  visible={Boolean(errors.nric && touched.nric)}
                >
                  {errors.nric}
                </HelperText>
                <TextInput
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  placeholder="Address"
                  value={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  error={Boolean(errors.address && touched.address)}
                  mode="outlined"
                />
                <HelperText
                  type="error"
                  visible={Boolean(errors.address && touched.address)}
                >
                  {errors.address}
                </HelperText>
                <TextInput
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  placeholder="Hourly Rate (RM)"
                  value={values.hourlyRate}
                  onChangeText={handleChange("hourlyRate")}
                  onBlur={handleBlur("hourlyRate")}
                  error={Boolean(errors.hourlyRate && touched.hourlyRate)}
                  mode="outlined"
                />
                <HelperText
                  type="error"
                  visible={Boolean(errors.hourlyRate && touched.hourlyRate)}
                >
                  {errors.hourlyRate}
                </HelperText>
                <Text style={styles.textGender}>Gender:</Text>
                <View style={styles.radioButton}>
                  <RadioButton.Group
                    onValueChange={handleChange("gender")}
                    value={values.gender}
                  >
                    <View style={styles.radioButton}>
                      <RadioButton.Android value="male" />
                      <Text style={styles.radioButtonText}>Male</Text>
                    </View>
                    <View style={styles.radioButton}>
                      <RadioButton.Android value="female" />
                      <Text style={styles.radioButtonText}>Female</Text>
                    </View>
                    <View style={styles.radioButton}>
                      <RadioButton.Android value="others" />
                      <Text style={styles.radioButtonText}>Others</Text>
                    </View>
                  </RadioButton.Group>
                </View>
                <Text style={styles.textGender}>Profile Picture: </Text>
                <View style={styles.photo}>
                  <View style={styles.rectangleBorder}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      {values.imageUrl ? (
                        <Image
                          source={{ uri: values.imageUrl }}
                          style={{ width: 200, height: 200 }}
                        />
                      ) : status.profile.uploading ? (
                        <View>
                          <ActivityIndicator
                            animating={true}
                            color={MD2Colors.blue700}
                          />
                          <Text>{status.profile.progress} %</Text>
                        </View>
                      ) : null}
                      <Button
                        onPress={() =>
                          pickImage("profile", handleChange("imageUrl"))
                        }
                      >
                        Select From Gallery
                      </Button>
                    </View>
                  </View>
                </View>
                <Text style={styles.textGender}>Photocopy of NRIC: </Text>
                <View style={styles.photo}>
                  <View style={styles.rectangleBorder}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      {values.nricFrontImageUrl ? (
                        <Image
                          source={{ uri: values.nricFrontImageUrl }}
                          style={{ width: 200, height: 200 }}
                        />
                      ) : status["nric-front"].uploading ? (
                        <View>
                          <ActivityIndicator
                            animating={true}
                            color={MD2Colors.blue700}
                          />
                          <Text>{status["nric-front"].progress} %</Text>
                        </View>
                      ) : null}
                      <Button
                        onPress={() =>
                          pickImage(
                            "nric-front",
                            handleChange("nricFrontImageUrl")
                          )
                        }
                      >
                        Select From Gallery
                      </Button>
                    </View>
                  </View>
                </View>
                <View style={styles.rectangleBorder}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {values.nricBackImageUrl ? (
                      <Image
                        source={{ uri: values.nricBackImageUrl }}
                        style={{ width: 200, height: 200 }}
                      />
                    ) : status["nric-back"].uploading ? (
                      <View>
                        <ActivityIndicator
                          animating={true}
                          color={MD2Colors.blue700}
                        />
                        <Text>{status["nric-back"].progress} %</Text>
                      </View>
                    ) : null}
                    <Button
                      onPress={() =>
                        pickImage("nric-back", handleChange("nricBackImageUrl"))
                      }
                    >
                      Select From Gallery
                    </Button>
                  </View>
                </View>
                <Text style={styles.textGender}>Services Offer: </Text>
                <ServiceChips selected={selected} handlePress={handleSelect} />
                <HelperText type="info">Select at least 1</HelperText>
                <View style={styles.buttomPadding}>
                  <Button
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                    buttonColor="#000000"
                    mode="contained"
                    disabled={!dirty || !isValid || isLoading}
                    onPress={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                </View>
              </View>
            )}
          </Formik>
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
