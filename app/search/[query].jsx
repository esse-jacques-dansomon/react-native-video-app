import { useEffect } from "react";
import {router, useLocalSearchParams} from "expo-router";
import {View, Text, FlatList, Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState, SearchInput, VideoCard } from "../../components";
import useAppwrite from "../../lib/useAppwrite";
import {searchPosts} from "../../lib/appwrite";
import {icons} from "../../constants";
import {goBack} from "expo-router/build/global-state/routing";

const Search = () => {
    const { query } = useLocalSearchParams();
    const { data: posts, refresh } = useAppwrite(() => searchPosts(query));

    useEffect(() => {
         refresh();
    }, [query]);

    const goToHome =()  =>{
        return router.replace("/Home")
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
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
                        <View className="flex my-6 px-4">
                           <View className={"flex-row justify-between"}>
                               <View>
                                   <Text className="font-pmedium text-gray-100 text-sm">
                                       Search Results
                                   </Text>
                                   <Text className="text-2xl font-psemibold text-white mt-1">
                                       {query}
                                   </Text>
                               </View>

                               <View className={"w-6 h-6 mr-4"}>
                                   <TouchableOpacity className={"w-full h-full"} onPress={goToHome}>
                                       <Image className={"w-full h-full"} source={icons.leftArrow} resizeMode={"contain"} />
                                   </TouchableOpacity>
                               </View>
                           </View>

                            <View className="mt-6 mb-8">
                                <SearchInput initialQuery={query} refetch={refresh} />
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
    );
};

export default Search;