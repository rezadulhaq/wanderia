import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../stores/slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "./NavFavorites";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView className="bg-white flex-1">
            <Text className="text-center py-5 text-xl">
                Where do you want to wander ?
            </Text>
            <View className="border-t border-gray-200 flex-shrink">
                <View>
                    <GooglePlacesAutocomplete
                        placeholder="Where to?"
                        styles={toInputBoxStyles}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description,
                                })
                            );
                            navigation.navigate("RideOptionsCard");
                        }}
                        query={{
                            key: "AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4",
                            language: "en",
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                    />
                </View>
                <NavFavorites />
            </View>

            <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
                <TouchableOpacity
                    className="bg-black w-24 py-3 px-4 rounded-full flex flex-row items-center justify-between"
                    onPress={() => navigation.navigate("RideOptionsCard")}
                >
                    <Icon
                        name="car"
                        type="font-awesome"
                        color="white"
                        size={16}
                    />
                    <Text style={tw`text-center text-white`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-black py-3 px-4 w-24 rounded-full flex flex-row items-center justify-between">
                    <Icon
                        name="fast-food-outline"
                        type="ionicon"
                        color="white"
                        size={16}
                    />
                    <Text style={tw`text-center text-white`}>Promo</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
});
