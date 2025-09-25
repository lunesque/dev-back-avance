import { Stack } from "expo-router";

export default function RootLayout() {
  const isLoggedIn = true;

  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="welcome" />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(app)" 
          options={{
          title: 'Notes'
        }}/>
      </Stack.Protected>
    </Stack>

  );
}
