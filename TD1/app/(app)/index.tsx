import React from 'react';
import { View, FlatList, StyleSheet, Text, Button, TextInput} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';

export default function AllNotesScreen() {
  const notes = [
    {id: 1, title: "note 1", body: "this is a note"},
    {id: 2, title: "note 2", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer"},
    {id: 3, title: "note 3", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer"},
    {id: 4, title: "note 4", body: "this is a note"},
    {id: 5, title: "note 5", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer"},
    {id: 6, title: "note 6", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer"},
    {id: 7, title: "note 7", body: "this is a note"},
    {id: 8, title: "note 8", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer"},
    {id: 9, title: "note 9", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer"},
    {id: 10, title: "note 10", body: "this is a note"},
    {id: 11, title: "note 11", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer"},
    {id: 12, title: "note 12", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer"}
];
  
    const Item = (item) => (
      <Link key={item.id} 
        href={{
        pathname: "/notes/[id]",
        params: { id: item.id, title: item.title, body: item.body }
        }}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail">{item.body}</Text>
        </View>
      </Link>

    );

    const [search, onChangeSearch] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Stack.Screen
        options={{
          title: 'Notes',
          headerRight: () => (
            
            // <TextInput 
            //   onChangeText={onChangeSearch}
            //   value={search}
            //   placeholder="Rechercher"
            // />
          ),
        }}
        />      
        <FlatList
          data={notes}
          renderItem={({item}) => <Item id={item.id} title={item.title} body={item.body} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});