import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter, Redirect } from 'expo-router';
import api from "../../services/api";
import useAuthStore from "../../store/authStore";

export default function ProfileScreen() {
  const [profile, setProfile] = React.useState([]);

  const router = useRouter();
  const userId = useAuthStore((state) => state.user?._id)
    
  React.useEffect(() => {
    const fetchUser = async () => {
        try {
            const { ok, data } = await api.get(`/user/${userId}`);
            if (!ok) return console.log("error fetching user data");
            setProfile(data);
        } catch(error) {
            console.log(error);
        }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
        await api.removeToken();
        router.replace({ pathname: '/signin' });
    } catch(error) {
        console.log(error);
    }
  }
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
            title: "Profile",
            headerRight: () => (
                <Button 
                title="Sign Out"
                onPress={handleSignOut}
                /> 
            )
            }}
        />
        <Text>Profile</Text>
        <View style={styles.container}>
            <Text>Username : {profile.username}</Text>
    
            <TouchableOpacity><Text>Change password</Text></TouchableOpacity>
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