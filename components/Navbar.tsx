import * as React from "react";
import { StyleSheet } from "react-native";
import { Appbar, FAB, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const MyComponent = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: "#000",
        },
      ]}
      safeAreaInsets={{ bottom }}
    >
      <Appbar.Action
        icon="home"
        color="#FFF"
        onPress={() => navigation.navigate("Home")}
      />
      <Appbar.Action
        icon="clipboard-text"
        color="#FFF"
        onPress={() => navigation.navigate("Contract List")}
      />
      <Appbar.Action
        icon="cog"
        color="#FFF"
        onPress={() => navigation.navigate("Settings")}
      />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    color: "#000",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
});

export default MyComponent;
