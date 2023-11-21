import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

import { getAllPlaces } from "../util/db";

function AllPlaces({ route }) {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function initData() {
      const results = await getAllPlaces();
      setPlaces(results);
    }

    if (isFocused) {
      initData();
    }
  }, [isFocused]);
  return <PlacesList places={places} />;
}

export default AllPlaces;
