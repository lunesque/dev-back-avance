import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <Stack.Screen
        options={{
          title: 'Notes'}}
        />  
        <Link style={styles.button} href="/signin">
            <Text>Sign In</Text>
        </Link>
        <Link style={styles.button} href="/signup">
            <Text>Créer un compte</Text>
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    margin: 12,
    padding: 20,
    backgroundColor: "pink",
    fontWeight: "bold"
  },
});
