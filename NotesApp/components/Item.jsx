import { Link, Stack } from 'expo-router';
import { View, FlatList, StyleSheet, Text, Button, TextInput} from 'react-native';

export default function Item({ id, title, body }) {
    return (
      <Link key={id} 
        href={{
        pathname: `/${id}`,
        params: { note: id, title: title, body: body }
        }}>
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail">{body}</Text>
        </View>
      </Link>
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