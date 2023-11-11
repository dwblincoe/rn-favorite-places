import { View, Text, FlatList, StyleSheet } from "react-native";

import PlaceItem from "./PlaceItem";

import { colors } from "../../constants/colors";

function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={({ item }) => <PlaceItem {...item} />}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.primary200,
  },
});
