import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../stores/slices/navSlice";
import tw from "tailwind-react-native-classnames";
const data = [
    {
        id: "1",
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
    },
    {
        id: "2",
        title: "Chat",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen",
    },
    {
        id: "3",
        title: "Login",
        image: "https://links.papareact.com/28w",
        screen: "LoginScreen",
    },
];

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 rounded-lg"
                    onPress={() => navigation.navigate(item.screen)}
                    // disabled={!origin}
                >
                    {/* <View style={tw`${!origin && "opacity-20"}`}> */}
                    <View>
                        <Image
                            style={{
                                width: 120,
                                height: 120,
                                resizeMode: "contain",
                            }}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View className="justify-between">
                        <Text className="mt-2 text-lg font-semibold">
                            {item.title}
                        </Text>
                        <Icon
                            className="p-2 bg-[#4a388e] rounded-full w-10 mt-4"
                            name="arrowright"
                            color="white"
                            type="antdesign"
                            style={tw`${!origin && "opacity-20"}`}
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default NavOptions;
