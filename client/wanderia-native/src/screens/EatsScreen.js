import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import MapEatsScreen from "../components/MapEatsScreen";
import { useDispatch, useSelector } from "react-redux";
import BussinessInfo from "../components/BussinessInfo";
import * as Icons from "@expo/vector-icons";
import { mapMarkers, openMarker } from "../stores/actionCreator";

const EatScreen = () => {
    const dispatcher = useDispatch();
    const { markerState, markers: bussinessMarker } = useSelector(
        (state) => state.ux
    );

    const getMarkers = async () => {
        await dispatcher(mapMarkers());
    };

    useLayoutEffect(() => {
        getMarkers();
    }, []);

    return (
        <View className="flex-1 flex-col relative">
            <View className="flex-1 w-full">
                <MapEatsScreen bussinessMarker={bussinessMarker} />
            </View>
            <View
                className={`${
                    markerState ? `h-1/2` : `h-0`
                } duration-200 w-full bg-white `}
            >
                <BussinessInfo markerState={markerState} />
            </View>
        </View>
    );
};

export default EatScreen;
