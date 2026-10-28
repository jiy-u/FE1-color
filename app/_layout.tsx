import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  // 앱 전체에서 사용할 폰트 등록
  const [fontsLoaded] = useFonts({
    GwangyangRegular: require("../assets/fonts/Gwangyang Sunshine Regular(TTF용).ttf"),
    GwangyangBold: require("../assets/fonts/Gwangyang Sunshine Bold(TTF용).ttf"),
    DalfitraRegular: require("../assets/fonts/Dalfitra-Regular.ttf"),
  });

  // 폰트가 준비될 때까지 기다리기
  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: false }} />
      <Stack.Screen name="create-design" options={{ headerShown: false }} />
      <Stack.Screen name="image-preview" options={{ headerShown: false }} />
      <Stack.Screen name="analyzing" options={{ headerShown: false }} />
      <Stack.Screen name="analysis-result" options={{ headerShown: false }} />
      <Stack.Screen name="material-select" options={{ headerShown: false }} />
      <Stack.Screen name="result" options={{ headerShown: false }} />
      <Stack.Screen name="area-edit" options={{ headerShown: false }} />
      <Stack.Screen name="image-editor" options={{ headerShown: false }} />
      <Stack.Screen name="wallpaper-analyze" options={{ headerShown: false }} />
    </Stack>
  );
}