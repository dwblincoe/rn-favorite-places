import PlaceForm from "../components/Places/PlaceForm";

import { insertPlace } from "../util/db";

function AddPlace({ navigation }) {
  async function createPlace(data) {
    await insertPlace(data);
    navigation.navigate("AllPlaces", { place: data });
  }

  return <PlaceForm onCreatePlace={createPlace} />;
}

export default AddPlace;
