import { Text, View , Image } from 'react-native'
import { Tabs } from 'expo-router'

import { icons} from '../../constants'

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
        name: "Profil",
        icon: "profile",
    }
]


const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View  className="items-center justify-center gap-2">

      <Image 
      source={icon} 
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
      />

      <Text className={`${focused ? 'font-psemibold' : 'font-regular'} text-xs` } style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}


const TabLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
          tabBarActiveTintColor: '#FF6347',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            height: 84,
            backgroundColor: '#161622',
            borderTopColor: '#161622',
            elevation: 0,

            }
      }}>
        {tabsItems.map((tab) => (
          <Tabs.Screen
            key={tab.id}
            name={tab.name}
            options={{
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
    </>
  )
}

export default TabLayout
