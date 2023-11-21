import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

function AllPlaces({ route }) {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setPlaces((prevPlaces) => [...prevPlaces, route.params.place]);
    }
  }, [isFocused]);
  return <PlacesList places={places} />;
}

export default AllPlaces;
