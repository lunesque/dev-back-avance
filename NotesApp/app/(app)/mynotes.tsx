import React from 'react';
import { View, FlatList, StyleSheet, Text, Button, TextInput} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import Item from '../../components/Item';
import api from "../../services/api";

export default function AllNotesScreen() {
  //États
  const [notes, setNotes] = React.useState([]);
  const [search, onChangeSearch] = React.useState('');

  //Récuperer tous les notes
  //TO DO :  Limiter aux notes de l'utilisateur actif
  React.useEffect(() => {
    const fetchNotes = async () => {
      const { ok, data } = await api.get("/note");
      if (!ok) return console.log("error fetching lists");
      setNotes(data);
    };
    fetchNotes();
  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {/* TO DO : Barre de recherche */}
        <Stack.Screen
        options={{
          title: 'Notes',
          headerRight: () => (
            <TextInput 
              onChangeText={onChangeSearch}
              value={search}
              placeholder="Rechercher"
            />
          ),
        }}
        />

        {/* Liste de notes */}
        <FlatList
          data={notes}
          renderItem={({ item }) => <Item id={item._id} title={item.title} body={item.body} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}