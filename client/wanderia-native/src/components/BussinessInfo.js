import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ChatUser from "./ChatUser";

const BussinessInfo = ({ markerState }) => {
    const { bussinessInfo } = useSelector((state) => state.ux);
    const navigator = useNavigation();
    const dispatcher = useDispatch();
    return (
        <>
            {markerState && (
                <TouchableOpacity
                    className="fixed -top-5 z-50 items-center justify-center"
                    onPress={() => {
                        dispatcher({ type: "closeMarker" });
                    }}
                >
                    <View className="h-10 w-10 bg-white items-center justify-center rounded-full border-[1px] border-gray-200">
                        <Icons.MaterialCommunityIcons
                            name="chevron-double-down"
                            className="text-3xl text-gray-800 rounded-xl"
                        />
                    </View>
                </TouchableOpacity>
            )}
            <ScrollView className="px-4">
                <View className="flex-row gap-3 mb-4">
                    <Image
                        source={{ uri: bussinessInfo?.imageUrl }}
                        className="w-24 h-32 rounded-xl object-contain"
                    />
                    <View className="gap-1 flex-1">
                        <Text className="text-2xl font-semibold">
                            {bussinessInfo?.name}
                        </Text>
                        <Text className="text-lg">
                            {bussinessInfo?.category}
                        </Text>
                        <Text className="text-gray-400">
                            {bussinessInfo?.address}
                        </Text>
                        <View className="flex-row gap-x-1">
                            {bussinessInfo?.rating && (
                                <View className="flex-row gap-1 items-center">
                                    <Text className="text-lg">
                                        {bussinessInfo?.rating}
                                    </Text>
                                    <Icons.MaterialCommunityIcons
                                        name="star"
                                        className="text-lg"
                                    />
                                </View>
                            )}
                            {bussinessInfo?.price && (
                                <View className="flex-row gap-1 items-center">
                                    <Text className="text-lg">Price:</Text>
                                    {bussinessInfo?.price
                                        .split("")
                                        .map((el) => (
                                            <Icons.FontAwesome5
                                                name="money-bill-wave"
                                                className="text-lg"
                                            />
                                        ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View className="mb-2">
                    <TouchableOpacity
                        className="flex-row justify-between"
                        onPress={() => navigator.navigate("HangoutScreen")}
                    >
                        <Text className="text-2xl font-semibold mb-1">
                            Hangouts
                        </Text>
                        <Icons.Feather name="arrow-right" className="text-xl" />
                    </TouchableOpacity>
                    <ScrollView horizontal className="flex-row gap-2">
                        <View>
                            <ChatUser username={"fahmifachrizal"} />
                        </View>
                        <View>
                            <ChatUser username={"user1"} />
                        </View>
                        <View>
                            <ChatUser username={"user2"} />
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <Text className="text-2xl font-semibold mb-1">
                        Events & Promos
                    </Text>
                    <ScrollView horizontal className="gap-2">
                        <TouchableOpacity>
                            <Image
                                source={{ uri: "https://i.pravatar.cc/300" }}
                                className="w-24 h-24 rounded-xl"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: "https://i.pravatar.cc/300" }}
                                className="w-24 h-24 rounded-xl"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: "https://i.pravatar.cc/300" }}
                                className="w-24 h-24 rounded-xl"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: "https://i.pravatar.cc/300" }}
                                className="w-24 h-24 rounded-xl"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: "https://i.pravatar.cc/300" }}
                                className="w-24 h-24 rounded-xl"
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ScrollView>
        </>
    );
};

export default BussinessInfo;
