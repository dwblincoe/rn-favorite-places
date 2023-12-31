import { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

import OutlinedButton from "../ui/OutlinedButton";

import { getAddress, getMapPreview } from "../../util/location";
import { colors } from "../../constants/colors";

function LocationPicker({ onPickLocation }) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [locationPermssionInformation, requestPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();

  useEffect(() => {
    async function handleLocation() {
      const address = await getAddress(...Object.values(pickedLocation));

      onPickLocation({ ...pickedLocation, address });
    }

    if (!!pickedLocation) {
      handleLocation();
    }
  }, [pickedLocation, onPickLocation]);

  useEffect(() => {
    if (isFocused && route.params) {
      const selectedLocation = route.params && {
        lat: route.params.selectedLocation.latitude,
        lng: route.params.selectedLocation.longitude,
      };
      setPickedLocation(selectedLocation);
    }
  }, [isFocused]);

  async function verifyPermissions() {
    if (locationPermssionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse;
    }

    if (locationPermssionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );

      return false;
    }

    return true;
  }

  async function handleGetLocation() {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    const {
      coords: { longitude, latitude },
    } = await getCurrentPositionAsync();

    setPickedLocation({ lat: latitude, lng: longitude });
  }

  function handlePickOnMap() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location taken yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{ uri: getMapPreview(pickedLocation) }}
        style={styles.image}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={handleGetLocation}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={handlePickOnMap}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    height: 200,
    width: "100%",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
