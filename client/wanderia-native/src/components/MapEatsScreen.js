import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Icons from "@expo/vector-icons";
import { openMarker } from "../stores/actionCreator";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const MapEatsScreen = ({ bussinessMarker }) => {
    const navigator = useNavigation();
    const dispatcher = useDispatch();
    const [bounds, setBounds] = useState(null);
    const mapRef = useRef(null);
    const { markerState } = useSelector((state) => state.ux);

    const onRegionChangeComplete = () => {
        mapRef.current.getMapBoundaries().then((map) => {
            setBounds(map);
        });
    };

    const filterMarkers = (bussinessMarker, bounds) => {
        return bussinessMarker.filter(
            (marker) =>
                marker.latitude >= bounds.southWest.latitude - 0.005 &&
                marker.latitude <= bounds.northEast.latitude + 0.005 &&
                marker.longitude >= bounds.southWest.longitude - 0.005 &&
                marker.longitude <= bounds.northEast.longitude + 0.005
        );
    };
    return (
        <>
            <View className="absolute top-16 left-5 z-50 w-20 h-10 items-center justify-center bg-white rounded-full shadow border-[1px] border-gray-200">
                <TouchableOpacity
                    className="flex-row justify-between"
                    onPress={() => navigator.navigate("HomeScreen")}
                >
                    <Icons.Feather name="arrow-left" className="text-2xl" />
                    <Text>{markerState.toString()}</Text>
                </TouchableOpacity>
            </View>
            <MapView
                ref={mapRef}
                onRegionChangeComplete={onRegionChangeComplete}
                className="flex-1"
                initialRegion={{
                    maptype: "mutedStandard",
                    latitude: -6.2608437,
                    longitude: 106.7815256,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                {bounds &&
                    filterMarkers(bussinessMarker, bounds).map(
                        (marker, index) => {
                            return (
                                <Marker
                                    key={"marker" + index}
                                    coordinate={{
                                        latitude: +marker.latitude,
                                        longitude: +marker.longitude,
                                    }}
                                    title={marker.name}
                                    description="origin"
                                >
                                    <View className="p-2 bg-white rounded-full shadow border-[1px] border-gray-200">
                                        <Text className="text-3xl">
                                            {String.fromCodePoint(
                                                parseInt(marker.icon, 16)
                                            )}
                                        </Text>
                                    </View>
                                    <Callout tooltip>
                                        <TouchableOpacity
                                            className="h-16 w-56 bg-white rounded-xl"
                                            onPress={() => {
                                                console.log(
                                                    "tap <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
                                                );
                                                dispatcher(
                                                    openMarker(marker.id)
                                                );
                                            }}
                                        >
                                            <View
                                                className={`border-gray-200 pl-2 h-full w-full bg-white rounded-xl flex-row flex-1 items-center border-[1px] shadow`}
                                            >
                                                <Image
                                                    source={{
                                                        uri: marker.imageUrl,
                                                    }}
                                                    className="h-12 w-12 rounded-xl"
                                                />
                                                <View className="flex-1 px-1">
                                                    <View>
                                                        <Text className="text-lg">
                                                            {marker.name
                                                                ?.length > 20
                                                                ? marker.name.slice(
                                                                      0,
                                                                      17
                                                                  ) + "..."
                                                                : marker.name}
                                                        </Text>
                                                        <Text className="text-xs font-light text-gray-500">
                                                            {marker.address
                                                                ?.length > 20
                                                                ? marker.address.slice(
                                                                      0,
                                                                      20
                                                                  ) + "..."
                                                                : marker.address}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View className="h-full w-8 rounded-r-xl pr-2">
                                                    <View className="flex-1 w-full h-full items-center justify-center border-b-[1px] border-gray-200">
                                                        <Icons.FontAwesome5
                                                            name="users"
                                                            className="text-xl text-gray-800"
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </Callout>
                                </Marker>
                            );
                        }
                    )}
            </MapView>
        </>
    );
};

export default MapEatsScreen;
