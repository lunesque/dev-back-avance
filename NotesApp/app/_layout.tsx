import { Stack } from "expo-router";
import useAuthStore from "../store/authStore";

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Stack>
      <Stack.Protected guard={!!isLoggedIn}>
        <Stack.Screen name="(app)" options={{ title: "All Notes" }} />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="index" options={{ header: () => null }} />
      </Stack.Protected>
    </Stack>
  );
}
