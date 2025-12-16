import { Stack } from "expo-router";
import useAuthStore from "../store/authStore";

export default function RootLayout() {
  // const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoggedIn = false;

  return (
    <Stack>
      <Stack.Protected guard={!!isLoggedIn}>
        <Stack.Screen name="(app)/mynotes" 
          options={{
          title: 'All Notes'
        }}/>
      </Stack.Protected>

      <Stack.Protected guard={!!isLoggedIn}>
        <Stack.Screen name="signin" />
      </Stack.Protected>
    </Stack>

  );
}
