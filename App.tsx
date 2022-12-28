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
import RequestScreen from "./screens/RequestScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import ChatScreen from "./screens/ChatScreen";
import CleanerListScreen from "./screens/CleanerListScreen";

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
          <Stack.Screen name="Request" component={RequestScreen} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Cleaner List" component={CleanerListScreen} />

          <Stack.Screen
            name="Forget Password"
            component={ForgetPasswordScreen}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
