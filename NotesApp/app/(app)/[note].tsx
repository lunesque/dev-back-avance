import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import api from "../../services/api";

export default function NoteScreen() {
  const { id } = useLocalSearchParams();

  const [titleValue, setTitleValue] = React.useState('');
  const [bodyValue, setBodyValue] = React.useState('');

  const router = useRouter();

  React.useEffect(() => {
    const getNote = async () => {
      try {
        const { ok, data } = await api.get(`/note/${id}`);
        if (!ok) return console.log('note not found');
        setTitleValue(data.title);
        setBodyValue(data.body);
      } catch(error) {
        console.log(error);
      }
    }
    getNote();
  }, []);
    

    const updateNote = async (t: string, b: string) => {
      try {
        const { ok, status } = await api.put(
          `/note/${id}`,
          {
            title: t,
            body: b
          }
        );
        if (!ok) return console.log(status);
      } catch(error) {
        console.log(error);
      }
    };

    const deleteNote = async () => {
      try {
        const { ok, status } = await api.delete(`/note/${id}`);
        if (!ok) return console.log(status);
        router.back();
      } catch(error) {
        console.log(error);
      }
    };

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
          title: "",
          headerRight: () => (
            <>
              <TouchableOpacity style={{marginVertical: 8, marginHorizontal: 16, padding: 3}} onPress={() => {updateNote(titleValue, bodyValue)}}>
                <Text>Save</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={{marginVertical: 8, marginHorizontal: 16, padding: 3}}  onPress={() => {deleteNote()}}>
                <Text>Delete</Text>
              </TouchableOpacity> 
            </>
          )
        }}
      />
      <TextInput
        editable
        multiline
        onChangeText={setTitleValue}
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
          onChangeText={setBodyValue}
          value={bodyValue}
          style={{flex: 0.6}}
        />
    </View>
  );
}