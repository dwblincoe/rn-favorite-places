import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({ navigation }) {
  function createPlace(data) {
    navigation.navigate("AllPlaces", { place: data });
  }

  return <PlaceForm onCreatePlace={createPlace} />;
}

export default AddPlace;
