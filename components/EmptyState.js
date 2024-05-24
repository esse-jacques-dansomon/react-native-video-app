import {View, Text, Image} from 'react-native'
import React from 'react'
import {images} from "../constants";
import {CustomButton} from "./index";
import {router} from "expo-router";

const EmptyState = ({
    title, subTitle
                    }) => {
    const goToCreate =() => {
        console.log("create")
        router.push('/Create')
    };
    return (
        <View className={"flex-1 justify-center items-center px-6"}>
            <Image source={images.empty} resizeMode={'contain'} className={"w-[270px] h-[215px]"}/>
            <Text className={"text-white text-lg font-pmedium mt-4"}>{title}</Text>
            <Text className={"text-gray-500 text-base font-pregular mt-1"}>{subTitle}</Text>

            <CustomButton
                title={"Create video"}
                otherStyles={"mt-4 mx-4 "}
                containerStyle={"w-full my-5 mx-4"}
                handlePress={goToCreate}
            />
        </View>
    )
}
export default EmptyState
