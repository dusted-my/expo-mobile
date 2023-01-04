import React, { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useAuthState } from "./AuthProvider";

interface Props {
  navigation: any;
  children: JSX.Element;
}

export const PublicRoute = (props: Props) => {
  const { navigation, children } = props;

  const { isAuthenticated, loading } = useAuthState();

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
  }, [loading]);

  return loading ? (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <ActivityIndicator />
    </View>
  ) : (
    children
  );
};
