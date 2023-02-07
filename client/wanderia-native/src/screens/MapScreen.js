import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Map from "../components/Map";
import MapView from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import ConfirmRide from "../components/ConfirmRide";
import {
    selectStartNavigation,
    setStartNavigation,
} from "../stores/slices/navSlice";
import { useSelector, useDispatch } from "react-redux";
import NavigationMap from "./NavigationMap";

const MapScreen = () => {
    const stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const startNavigation = useSelector(selectStartNavigation);
    const dispatch = useDispatch();

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    dispatch(setStartNavigation(false));
                    navigation.navigate("HomeScreen");
                }}
                style={tw`absolute top-10 left-5 bg-purple-100 z-50 p-3 rounded-full shadow-lg`}
            >
                <Icon name="menu" />
            </TouchableOpacity>
            <View style={tw`${!startNavigation ? "h-1/2" : "h-full"}`}>
                <Map />
            </View>

            <View style={tw`${!startNavigation ? "h-1/2 w-full" : "hidden"}`}>
                <stack.Navigator>
                    <stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name="ConfirmRide"
                        component={ConfirmRide}
                        options={{ headerShown: false }}
                    />
                </stack.Navigator>
            </View>
        </View>
    );
};

export default MapScreen;
