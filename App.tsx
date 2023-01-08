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
import CleanerListScreen from "./screens/CleanerListScreen";
import ReportScreen from "./screens/ReportScreen";
import { useLoadFonts } from "./hooks";
import { ContextProvider } from "./providers";
import CleanerScreen from "./screens/CleanerScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import GlobalSnackBar from "./providers/SnackbarProvider/GlobalSnackbar";
import ContractListScreen from "./screens/ContractListScreen";
import ProposedContractScreen from "./screens/ProposedContractScreen";
import ReceivedContractScreen from "./screens/ReceivedContractScreen";
import FeedbackScreen from "./screens/FeedbackScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const options = { headerShown: false };

  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) return null;

  return (
    <ContextProvider>
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator>
            {/* public routes */}
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={options}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="Forget Password"
              component={ForgetPasswordScreen}
            />

            {/* private routes */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={options}
            />
            <Stack.Screen name="Cleaner List" component={CleanerListScreen} />
            <Stack.Screen name="Cleaner" component={CleanerScreen} />
            <Stack.Screen name="Contract List" component={ContractListScreen} />
            <Stack.Screen
              name="Proposed Contract"
              component={ProposedContractScreen}
            />
            <Stack.Screen
              name="Received Contract"
              component={ReceivedContractScreen}
            />
            <Stack.Screen name="Report" component={ReportScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Request" component={RequestScreen} />
            <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
            <Stack.Screen name="Feedback" component={FeedbackScreen} />
          </Stack.Navigator>
          <GlobalSnackBar />
        </PaperProvider>
      </NavigationContainer>
    </ContextProvider>
  );
}
