import {FlatList, Image, RefreshControl, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import {SearchInput, Trending, EmptyState, VideoCard} from "../../components";
import {getAllPosts, getLatestPosts} from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppwrite";

const Home = () => {
    const {data, loading,refresh,  error} = useAppWrite(getAllPosts)
    const {data: lastestPosts} = useAppWrite(getLatestPosts)

    const [search, setSearch] = React.useState('')
    const [refreshing, setRefreshing] = React.useState(false)

    const onRefresh = async () => {
        setRefreshing(true)
        await refresh()
        setRefreshing(false)
    }


    return (
        <SafeAreaView className={"bg-primary px-4 h-full"}>
            <FlatList
                data={data}
                keyExtractor={
                    item => item.id
                }
                renderItem={
                    ({item}) => (
                       <VideoCard thumbnail={'https://placehold.co/400?text=Hello+World'} title={item.title} video={item.video} avatar={item.creator.avatar} creator={item.creator.username}  />
                    )
                }
                ListHeaderComponent={() => (
                    <View className={"my-6 space-y-6"}>

                        <View className={"justify-between items-start flex-row"}>
                            <View>
                                <Text className={"text-gray-100 text-sm font-pmedium"}>Welcome back</Text>
                                <Text className={"text-white text-2xl font-bold"}>EsseJacques</Text>
                            </View>
                            <View className={"mt-1-5"}>
                                <Image resizeMode={"contain"} source={images.logoSmall} className={"w-18 h-10"}/>
                            </View>

                        </View>

                        <SearchInput otherStyles={"mt-5"} type={"text"} placeholder={'Search for video or topic'} value={search}  />

                        <View className={"w-full flex-1 pt-3 pb-8"} >
                            <Text className={"text-gray-500 text-lg font-pregular mb-3"}>Trending</Text>

                            <Trending posts={lastestPosts}/>
                        </View>



                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title={"No videos found"} subTitle={"Try searching for videos"}/>
                )}

                refreshControl=
                    { <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}


            />

        </SafeAreaView>
    )
}

export default Home