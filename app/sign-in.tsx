import React from "react";
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import images from '@/constants/images'
import icons from '@/constants/icons'



const SignIn = () => {

    const handleLogin = () => { }

    return (
        <SafeAreaView bg-white h-full>
            <ScrollView contentContainerClassName="h-full">
                <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain" ></Image>
                <View className="px-10">
                    <Text className="font-rubik font-bold uppercase text-center text-black-200">Welcome to KeyStone</Text>
                    <Text className="font-rubik text-center text-3xl font-bold mt-2">Lets Get You Closer to {"\n"}
                        <Text className="text-primary-300">Your Dream Home</Text>
                    </Text>
                    <Text className=" text-center text-lg text-black-200 mt-12 font-rubik">Login to KeyStone with Google</Text>
                    <TouchableOpacity onPress={handleLogin} className="bg-white shadow-lg rounded-full w-full shadow-zinc-300 py-4 mt-5">
                        <View className="flex-row items-center justify-center">
                            <Image source={icons.google} className="w-5 h-5" resizeMode="contain"></Image>
                            <Text className="font-bold text-lg font-rubik-medium ml-2">Continue with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default SignIn