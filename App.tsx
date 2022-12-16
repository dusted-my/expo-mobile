import { Provider as PaperProvider } from "react-native-paper";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />

          <Stack.Screen
            name="Forget Password"
            component={ForgetPasswordScreen}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
