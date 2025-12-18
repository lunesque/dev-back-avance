import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <Stack.Screen
            options={{
                headerShow: false,
            }}
        />
        <Text style={styles.title}>Notes App</Text>
        <Link style={styles.button} href="/signin">
            <Text>Sign In</Text>
        </Link>
        <Link style={styles.button} href="/signup">
            <Text>Create an account</Text>
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
    margin: 4,
    padding: 20,
    backgroundColor: "pink",
    fontWeight: "bold", 
    borderRadius: 40
  },
  title: {
    fontSize: 40,
    margin: 40
  }
});
