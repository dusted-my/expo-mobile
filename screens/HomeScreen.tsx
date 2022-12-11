import React from "react";
import { Button, Image, View } from "react-native";
import { Badge } from "react-native-paper";

const HomeScreen = ({ navigation }) => (
  <View>
    <Image
      style={{ resizeMode: "contain", height: 100, width: 200 }}
      source={require("../assets/dusted.png")}
    />
    <Button title="go" onPress={() => navigation.navigate("Login")}></Button>
  </View>
);

export default HomeScreen;
