import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

export default function NoteScreen() {
  const { id, title, body } = useLocalSearchParams();

  const [titleValue, onChangeTitle] = React.useState(`${title}`);
  const [bodyValue, onChangeBody] = React.useState(`${body}`);

return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        margin: 16
      }}
    >
      <Stack.Screen
        options={{
          title: title,
        }}
      />
      <TextInput
        editable
        multiline
        onChangeText={text => onChangeTitle(text)}
        value={titleValue}
        style={{
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 8,
        }}
      />

        <TextInput
          editable
          multiline
          onChangeText={text => onChangeBody(text)}
          value={bodyValue}
        />
    </View>
  );
}