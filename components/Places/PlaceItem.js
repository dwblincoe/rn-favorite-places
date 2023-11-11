import { Image, Text, StyleSheet, Pressable } from "react-native";

function PlaceItem({ id, title, address, imageUri, onSelect }) {
  return (
    <Pressable key={id} onPress={onSelect}>
      <Image source={{ uri: imageUri }} />
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({});
