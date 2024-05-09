import {StatusBar} from 'expo-status-bar';
import {Image, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../constants";
import CustomButton from "../components/CustomButton";
import {router , Redirect } from "expo-router";
import {useGlobalContext} from "../context/GlobalProvider";
import {Loader} from "../components";

export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext();

    if(!isLoading && isLoggedIn) return <Redirect href="/Home" />




    return (
       <SafeAreaView className="bg-primary h-full">
           <ScrollView contentContainerStyle={{height: '100%'}}>

               <Loader isLoading={isLoading} />

               <View className="items-center justify-center h-full px-4">
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className="w-[130px] h-[84px]"
                    ></Image>
                    <Image
                        source={images.cards}
                        resizeMode="contain"
                        className="w-[380px] h-[300px]"
                    ></Image>
                    <View className="relative mt-7">
                        <Text className="text-3xl font-pbold text-white text-center font-bold">
                            Discover Endless Possibilities with{" "}
                            <Text className="text-secondary-200">Cauris</Text>

                        </Text>
                        <Image
                            source={images.path}
                            className="absolute -bottom-2 -right-8 w-[136px] h-[15px]"
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where creativity happens and ideas are born to life in a blink of an eye.
                    </Text>

                    <CustomButton
                        title="Continue with email"
                        handlePress={() => router.push('/sign-in')}
                        containerStyle="mt-7 w-full"

                    />

                </View>

               <StatusBar  backgroundColor="#161622" style="light" />

           </ScrollView>
       </SafeAreaView>
    );
}


