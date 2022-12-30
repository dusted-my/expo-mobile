import { useFonts } from "@expo-google-fonts/inter";
import {
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export const useLoadFonts = () => {
  let [fontsLoaded, error] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (error) {
    console.error("Load Inter Fonts Error:", error.message);
  }

  return fontsLoaded;
};
