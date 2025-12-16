import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';

export default function SignUpScreen() {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [hidePass, setHidePass] = useState(true);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Créer un compte'}}
      />  
      <Text>Username</Text>
      <TextInput
          style={styles.inputContainer}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="username"
        />

      <Text>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
            onChangeText={onChangePassword}
            value={password}
            placeholder="password"
            secureTextEntry={hidePass}
          />
          <TouchableOpacity  
            style={{
              alignSelf: "flex-end"
            }}
            onPress={() => setHidePass(!hidePass)}
          >
            <Text>{hidePass ? "Show" : "Hide"}</Text>
          </TouchableOpacity>
      </View>
      <Button title="Sign Up" onPress={()=> console.log("pushed")}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    justifyContent: "center",
    margin: 20
  },
  inputContainer: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 12,
    justifyContent: "space-between",
    flexDirection: "row"
  },
});