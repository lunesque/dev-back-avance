import React from "react";
import {
  FlatList,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Link, Stack, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../services/api";
import useAuthStore from "../../store/authStore";

export default function AllNotesScreen() {
  //États
  const [notes, setNotes] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const router = useRouter();
  const userId = useAuthStore((state) => state.user?._id);

  // Récuperer tous les notes au mount et avec chaque retour
  useFocusEffect(
    React.useCallback(() => {
      const fetchNotes = async () => {
        const { ok, data } = await api.get(`/note/user/${userId}`);
        if (!ok) return console.log("error fetching notes");
        setNotes(data);
      };
      fetchNotes();
      setSearch("");
    }, []),
  );

  const createNote = async () => {
    try {
      const { ok, data } = await api.post(`/note`, {
        title: "",
        body: "",
      });
      if (!ok) return console.log("error creating note");
      router.push({
        pathname: `/${data._id}`,
        params: { id: data._id },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* TO DO : Barre de recherche */}
        <Stack.Screen
          options={{
            title: "Notes",
            headerLeft: () => (
              <TextInput
                onChangeText={setSearch}
                value={search}
                placeholder="Rechercher"
                style={styles.input}
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  router.navigate("/profile");
                }}
              >
                <Text>Profile</Text>
              </TouchableOpacity>
            ),
          }}
        />

        {/* Liste de notes */}
        <FlatList
          //Filtrer les notes en fonction de la recherche
          data={notes.filter((note) => {
            if (note.title && note.body)
              return (
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.body.toLowerCase().includes(search.toLowerCase())
              );
            else if (!search) return note;
            else return null;
          })}
          renderItem={({ item }) => (
            <Link
              key={item._id}
              href={{
                pathname: `/${item._id}`,
                params: { id: item._id, title: item.title, body: item.body },
              }}
            >
              <View style={styles.item}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.title}
                >
                  {item.title}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {item.body}
                </Text>
              </View>
            </Link>
          )}
        />

        <TouchableOpacity
          onPress={() => {
            createNote();
          }}
          style={styles.add}
        >
          <Text style={styles.addIcon}> + </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.replace("/admin");
          }}
          style={styles.adminButton}
        >
          <Text style={styles.adminButtonText}>Administration View</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  input: {
    width: 120,
    borderRadius: 20,
    padding: 8,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  add: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: "50%",
    borderStyle: "solid",
    borderColor: "black",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    fontSize: 52,
    padding: 8,
    paddingTop: 0,
  },
  adminButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "black",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  adminButtonText: {
    fontSize: 20,
    padding: 12,
  },
});
