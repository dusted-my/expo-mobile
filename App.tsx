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
import ChatScreen from "./screens/ChatScreen";
import CleanerListScreen from "./screens/CleanerListScreen";
import ReportScreen from "./screens/ReportScreen";
import BookingScreen from "./screens/CleanerScreen";
import PaymentScreen from "./screens/PaymentScreen";
import BookingConfirmedScreen from "./screens/BookingConfirmedScreen";
import { useLoadFonts } from "./hooks";
import { ContextProvider } from "./providers";
import CleanerScreen from "./screens/CleanerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const options = { headerShown: false };

  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <PaperProvider>
        <ContextProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={options}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={options}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={options}
            />
            <Stack.Screen name="Request" component={RequestScreen} />
            <Stack.Screen name="Report" component={ReportScreen} />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={options}
            />
            <Stack.Screen name="Cleaner List" component={CleanerListScreen} />
            <Stack.Screen name="Cleaner" component={CleanerScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen
              name="Booking Confirmed"
              component={BookingConfirmedScreen}
            />
            <Stack.Screen
              name="Forget Password"
              component={ForgetPasswordScreen}
            />
          </Stack.Navigator>
        </ContextProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
