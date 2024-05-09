import {Text, TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyle, textStyles, isLoading,}) => {
    return (
        <TouchableOpacity className={`
        justify-center items-center rounded-xl bg-secondary min-h-[50px]
         ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
                          onPress={handlePress}
                          disabled={isLoading}
        >
            <Text className={`text-primary font-bold text-sm ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}
export default CustomButton

