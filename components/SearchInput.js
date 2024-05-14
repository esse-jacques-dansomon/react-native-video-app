import {View, TextInput, TouchableOpacity, Image, Alert} from 'react-native'
import React from 'react'
import {icons} from "../constants";
import {router, usePathname} from "expo-router";

const SearchInput = ({ type, placeholder, otherStyles, keyboardType, initialQuery, refetch }) => {
    const [show, setShow] = React.useState(false)
    const pathName = usePathname()
    const [query, setQuery] = React.useState(initialQuery ||'')

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <View className="flex-row w-full h-12 px-4 bg-black-100 items-center">
                <TextInput
                    className="flex-1 text-white font-psemibold"
                    placeholder={placeholder}
                    placeholderTextColor={"#6B7280"}
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    keyboardType={keyboardType}
                    secureTextEntry={type === "password" && !show}
                />

                    <TouchableOpacity onPress={() => {
                        if (!query) return Alert.alert('Search', 'Please enter a search query')
                        if (pathName.startsWith('/search')) {
                            router.setParams({query})
                        }else {
                            router.push(`/search/${query}`)
                        }
                    }}>
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
