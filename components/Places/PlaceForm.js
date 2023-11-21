import { useCallback, useState } from "react";
import { ScrollView, TextInput, View, Text, StyleSheet } from "react-native";

import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";

import { Place } from "../../models/place";

import { colors } from "../../constants/colors";

function PlaceForm({ onCreatePlace }) {
  const [form, setForm] = useState({
    title: "",
    location: null,
    image: null,
  });

  function handleChange(name, value) {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  function savePlace() {
    const data = new Place(form.title, form.image, form.location);

    onCreatePlace(data);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={form.title}
          onChangeText={handleChange.bind(this, "title")}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={handleChange.bind(this, "image")} />
      <LocationPicker
        onPickLocation={useCallback((location) => {
          handleChange("location", location);
        }, [])}
      />
      <Button onPress={savePlace}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: colors.primary100,
  },
});
