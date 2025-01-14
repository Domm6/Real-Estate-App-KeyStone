import { SplashScreen, Stack } from "expo-router";
import { useEffect } from 'react'
import './global.css'
import { useFonts } from 'expo-font'
import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Rubik: require('../assets/fonts/Rubik-Regular.ttf'),
    RubikMedium: require('../assets/fonts/Rubik-Medium.ttf'),
    RubikSemiBold: require('../assets/fonts/Rubik-SemiBold.ttf'),
    RubikBold: require('../assets/fonts/Rubik-Bold.ttf'),
    RubikLight: require('../assets/fonts/Rubik-Light.ttf'),
    RubikExtraBold: require('../assets/fonts/Rubik-ExtraBold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />;
    </GlobalProvider>
  )
}
