import {View, Text, FlatList, TouchableOpacity, Image} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import {getUserPosts, signOut} from "../../lib/appwrite";
import {useEffect} from "react";
import {useGlobalContext} from "../../context/GlobalProvider";
import {SafeAreaView} from "react-native-safe-area-context";
import {EmptyState, InfoBox, SearchInput, VideoCard} from "../../components";
import {icons} from "../../constants";

const Profile = () => {
    const {user, setUser, setIsLoggedIn} = useGlobalContext()
    const {data: posts, refresh} = useAppwrite(() => getUserPosts(user.$id))

    useEffect(() => {
        refresh()
    }, [user]);


    const logout = () => {
        signOut();
        setUser(null);
        setIsLoggedIn(false);
        router.replace("sign-in")
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({item}) => (
                    <VideoCard
                        title={item.title}
                        thumbnail={item.thumbnail}
                        video={item.video}
                        creator={item.creator.username}
                        avatar={item.creator.avatar}
                    />
                )}
                ListHeaderComponent={() => (
                    <>
                        <View className="w-full justify-center items-center my-6 px-4">
                            <TouchableOpacity className={"w-full items-end mb-10"} onPress={logout}>
                                <Image source={icons.logout} resizeMode={'contain'} className={"w-6 h-6"}/>
                            </TouchableOpacity>

                            <View
                                className={"w-16 h-16 border border-secondary rounded-lg justify-center items-center"}>
                                <Image source={{uri: user?.avatar}} className={"h-[90%] w-[90%] rounded-lg"}
                                       resizeMode={"cover"}/>
                            </View>

                            <InfoBox
                                title={user?.username}
                                containerStyles={"mt-5"}
                                titleStyles={'text-lg'}
                            />

                            <View className={"mt-5 flex-row"}>
                                <InfoBox
                                    title={posts.length || 0}
                                    subTitle={"Posts"}
                                    containerStyles={"mr-10"}
                                    titleStyles={'text-xl'}
                                />
                                <InfoBox
                                    title={"1.2K"}
                                    subTitle={"Followers"}
                                    titleStyles={'text-xl'}
                                />
                            </View>

                        </View>
                    </>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos found for this search query"
                    />
                )}
            />
        </SafeAreaView>

    )
}

export default Profile