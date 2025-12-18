import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

export default function Form({ username, setUsername, password, setPassword }) {
  const [hidePass, setHidePass] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text>Username*</Text>
      <TextInput
          style={styles.inputContainer}
          onChangeText={setUsername}
          value={username}
          placeholder="username"
          width="100%"
          required
        />

      <Text>Password*</Text>
      <View style={styles.inputContainer}>
        <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="password"
            secureTextEntry={hidePass}
            width="80%"
            required
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 12,
    justifyContent: "space-between",
    flexDirection: "row"
  },
});