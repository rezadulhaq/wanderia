import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { useSelector, useDispatch } from "react-redux";
import {
    selectTravelTimeInformation,
    setSelectedRide,
} from "../stores/slices/navSlice";

const data = [
    {
        id: "route-1",
        title: "Route 1",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "route-2",
        title: "Route 2",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "route-3",
        title: "Route 3",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

const SURGE_CHARAGE_RATE = 5000;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const dispatch = useDispatch();

    // const { formatCurrency } = useGlobalize();
    // console.log(g);

    return (
        <SafeAreaView className="bg-white flex-grow">
            <View>
                <TouchableOpacity
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
                    onPress={() => navigation.navigate("NavigateCard")}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text className="text-center py-5 text-xl">
                    Select a Ride - {travelTimeInformation?.distance?.text}
                </Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({
                    item: { id, title, multiplier, image },
                    item,
                }) => (
                    <TouchableOpacity
                        style={tw`flex-row justify-between items-center px-10 ${
                            id === selected?.id && "bg-gray-200"
                        }`}
                        onPress={() => {
                            setSelected(item);
                        }}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{ uri: image }}
                        />
                        <View className="-ml-6">
                            <Text className="text-xl font-semibold">
                                {title}
                            </Text>
                            <Text>
                                {travelTimeInformation?.duration.text} Wander
                                Time
                            </Text>
                        </View>
                        <Text className="text-xl">
                            {(travelTimeInformation?.duration?.value *
                                SURGE_CHARAGE_RATE *
                                multiplier) /
                                100}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity
                    style={tw`bg-black py-3 m-3 rounded-full ${
                        !selected && `bg-gray-300`
                    }`}
                    disabled={!selected}
                    onPress={() => {
                        dispatch(setSelectedRide(selected));
                        navigation.navigate("ConfirmRide");
                    }}
                >
                    <Text className="text-center text-xl text-white">
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
