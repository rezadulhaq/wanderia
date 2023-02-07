import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import {
    selectOrigin,
    selectDestination,
    selectWaypoints,
} from "../stores/slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch } from "react-redux";
import {
    setTravelTimeInformation,
    selectStartNavigation,
} from "../stores/slices/navSlice";
import * as Location from "expo-location";

const Map = () => {
    const origin = useSelector(selectOrigin);
    // console.log("origin", origin);
    const destination = useSelector(selectDestination);
    const waypoints = useSelector(selectWaypoints);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const startNavigation = useSelector(selectStartNavigation);

    useEffect(() => {
        if (!origin || !destination) return;

        // Zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(
            ["origin", "destination", "waypoint"],
            {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            }
        );
    }, [origin, destination]);

    useEffect(() => {
        if (!startNavigation) return;
        // I want to zoom in to origin location
        mapRef.current.fitToSuppliedMarkers(["origin"], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [startNavigation]);

    useEffect(() => {
        if (!origin || !destination) return;
        // Get the distance and time of the route and every waypoints
        // const waypointInput = waypoints.map((waypoint) => {
        //     Location.reverseGeocodeAsync({
        //         latitude: waypoint.latitude,
        //         longitude: waypoint.longitude,
        //     })
        //         .then((res) => {
        //             console.log("res", res);
        //             let address = `${res[0].district} ${res[0].subregion} ${res[0].region} ${res[0].country}`;
        //             console.log("address", address);
        //             return address;
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // });

        // console.log("====================================");
        // console.log("waypointInput", waypointInput);
        // console.log("====================================");

        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4`
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    dispatch(
                        setTravelTimeInformation(data.rows[0].elements[0])
                    );
                });
        };

        getTravelTime();
    }, [origin, destination]);

    return (
        <MapView
            ref={mapRef}
            style={tw`h-full w-full`}
            mapType="mutedStandard"
            initialRegion={{
                // use device current location
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            showsMyLocationButton={true}
            camera={
                startNavigation && {
                    center: {
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    },
                    pitch: 60,
                    heading: 0,
                    altitude: 1000,
                    zoom: 20,
                }
            }
        >
            {origin && destination && waypoints && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    waypoints={waypoints}
                    apikey="AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4"
                    strokeWidth={3}
                    strokeColor="blue"
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}

            {waypoints?.map((waypoint, index) => {
                return (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: waypoint.latitude,
                            longitude: waypoint.longitude,
                        }}
                        title="Waypoint"
                        description={waypoint.description}
                        identifier="waypoint"
                    />
                );
            })}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({});
