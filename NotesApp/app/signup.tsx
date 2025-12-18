import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import api from "../services/api";
import Form from "../components/Form";

export default function SignUpScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const signUp = async () => {
    try {
      const { ok, data } = await api.post(
        "/user", 
        {
          username: username,
          password: password
        }
      );
      if (!ok) return console.log("Unable to sign up");

      router.navigate("/signin");
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />  
      <Text style={styles.title}>Create an account</Text>
      <Form password={password} setPassword={setPassword} username={username} setUsername={setUsername}  />
      <TouchableOpacity onPress={signUp} style={styles.button}><Text style={styles.buttonLabel}>Sign Up</Text></TouchableOpacity>
      <Link style={styles.link}
        href={{
        pathname:"/signin"
      }}>Already have an account ? Sign in</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    justifyContent: "center",
    margin: 20
  },
  title: {
    fontSize: 32,
    flex: 0.3,
    justifyContent: "center",
    alignSelf: "center",
    margin: 20
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "pink",
    borderRadius: 40
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold", 
  },
  link: {
    textDecorationLine: "underline",
    alignSelf: "center",
    marginTop: 12
  }
});