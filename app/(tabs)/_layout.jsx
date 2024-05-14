import {Text, View, Image} from 'react-native'
import {Redirect, Tabs} from 'expo-router'

import {icons} from '../../constants'
import {useGlobalContext} from "../../context/GlobalProvider";
import {StatusBar} from "expo-status-bar";
import {Loader} from "../../components";

const tabsItems = [
    {
        id: 1,
        name: "Home",
        icon: "home",
    },
    {
        id: 2,
        name: "Bookmark",
        icon: "bookmark",
    },
    {
        id: 3,
        name: "Create",
        icon: "plus",
    },
    {
        id: 4,
        name: "Profile",
        icon: "profile",
    }
]


const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-1 pt-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-regular'} text-xs`} style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}


const TabLayout = () => {
    const {isLoading, isLoggedIn} = useGlobalContext();
    if (!isLoading && !isLoggedIn) return <Redirect href="/sign-in"/>;



    return (
        <>
            <Tabs screenOptions={{
                tabBarActiveTintColor: "#FFA001",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#161622",
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 84,
                },
            }}>
                {tabsItems.map((tab) => (
                    <Tabs.Screen
                        key={tab.id}
                        name={tab.name}
                        options={{
                            title: tab.name,
                            headerShown: false,
                            tabBarIcon: ({focused, color}) => (
                                <TabIcon
                                    icon={icons[tab.icon]}
                                    color={color}
                                    name={tab.name}
                                    focused={focused}
                                />
                            ),
                        }}
                    />
                ))}
            </Tabs>

            <Loader isLoading={isLoading}/>
            <StatusBar backgroundColor="#161622" style="light" />
        </>
    )
}

export default TabLayout
