import {View, Text} from 'react-native'
import React from 'react'

const InfoBox = ({title, subTitle, titleStyles, containerStyles}) => {
    return (
        <View className={containerStyles}>
            <Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
            <Text className={`text-gray-200 text-center font-psemibold`}>{subTitle}</Text>
        </View>
    )
}
export default InfoBox
