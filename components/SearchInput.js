import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {icons} from "../constants";

const SearchInput = ({ type, value, onChange, placeholder, otherStyles, keyboardType}) => {
    const [show, setShow] = React.useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <View className="flex-row w-full h-12 px-4 bg-black-100 items-center">
                <TextInput
                    className="flex-1 text-white font-psemibold"
                    placeholder={placeholder}
                    placeholderTextColor={"#6B7280"}
                    value={value}
                    onChangeText={onChange}
                    keyboardType={keyboardType}
                    secureTextEntry={type === "password" && !show}
                />

                    <TouchableOpacity onPress={() => setShow(!show)}>
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            className="w-5 h-5"
                        />
                    </TouchableOpacity>

            </View>
        </View>
    )
}
export default SearchInput
