import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { icons } from '../constants'

const FormField = ({label, type, value, onChange, placeholder, otherStyles, keyboardType}) => {
    const [show, setShow] = React.useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-green-100 font-medium">{label}</Text>
            <View className="flex-row border-2 border-primary w-full h-14 px-4 bg-black-100 rounded-xl focus:border-secondary items-center">
                <TextInput
                    className="flex-1 text-white font-psemibold"
                    placeholder={placeholder}
                    placeholderTextColor={"#6B7280"}
                    value={value}
                    onChangeText={onChange}
                    keyboardType={keyboardType}
                    secureTextEntry={type === "password" && !show}
                />
                {type === "password" && (
                    <TouchableOpacity onPress={() => setShow(!show)}>
                        <Image
                            source={show ? icons.eye : icons.eyeHide}
                            resizeMode="contain"
                            className="w-6 h-6"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
export default FormField
