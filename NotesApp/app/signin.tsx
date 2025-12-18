import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import api from "../services/api";
import useAuthStore from "../store/authStore";
import Form from "../components/Form";
import Message from "../components/Message";

export default function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { setUser, setIsLoggedIn, setToken } = useAuthStore();
  const [message, setMessage] = React.useState("");

  const signIn = async () => {
    try {
      const res = await api.post("/user/signin", {
        username: username,
        password: password,
      });

      if (res.ok) {
        setUser(res.data);
        setIsLoggedIn(true);
        setToken(res.token);
      } else {
        res.message
          ? setMessage(res.message)
          : setMessage("Invalid username or password");
        return console.log(res);
      }

      router.navigate("/(app)");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Text style={styles.title}>Sign In</Text>
      {message ? <Message message={message} /> : null}
      <Form
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
      />
      <TouchableOpacity onPress={signIn} style={styles.button}>
        <Text style={styles.buttonLabel}>Sign In</Text>
      </TouchableOpacity>
      <Link
        style={styles.link}
        href={{
          pathname: "/signup",
        }}
      >
        Don't have an account ? Sign up now
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    justifyContent: "center",
    margin: 20,
  },
  title: {
    fontSize: 32,
    flex: 0.3,
    justifyContent: "center",
    alignSelf: "center",
    margin: 20,
  },
  button: {
    alignSelf: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "pink",
    borderRadius: 40,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    textDecorationLine: "underline",
    alignSelf: "center",
    marginTop: 12,
  },
});
