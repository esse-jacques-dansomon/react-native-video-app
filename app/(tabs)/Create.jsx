import {Text, View, Image, ScrollView, TouchableOpacity, Alert} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import {CustomButton, FormField} from "../../components";
import {ResizeMode, Video} from "expo-av";
import {icons} from "../../constants";
import * as DocumentPicker from "expo-document-picker";
import {useGlobalContext} from "../../context/GlobalProvider";
import {router} from "expo-router";
import {createVideoPost} from "../../lib/appwrite";

const Create = () => {
    const { user } = useGlobalContext();
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        video: '',
        thumbnail: null,
        prompt: null
    })

    const openPicker = async (selectType) => {
        const result = await DocumentPicker.getDocumentAsync({
            type:
                selectType === "image"
                    ? ["image/png", "image/jpg"]
                    : ["video/mp4", "video/gif"],
        });

        if (!result.canceled) {
            if (selectType === "image") {
                setForm({
                    ...form,
                    thumbnail: result.assets[0],
                });
            }

            if (selectType === "video") {
                setForm({
                    ...form,
                    video: result.assets[0],
                });
            }
        } else {
            setTimeout(() => {
                Alert.alert("Document picked", JSON.stringify(result, null, 2));
            }, 100);
        }
    };




    const onSubmit = async () => {
        if (
            (form.prompt === "") |
            (form.title === "") |
            !form.thumbnail |
            !form.video
        ) {
            return Alert.alert("Please provide all fields");
        }

        setUploading(true);
        try {
            await createVideoPost({
                ...form,
                userId: user.$id,
            });

            Alert.alert("Success", "Post uploaded successfully");
            router.push("/Home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setForm({
                title: "",
                video: null,
                thumbnail: null,
                prompt: "",
            });

            setUploading(false);
        }
    };
    return (
        <SafeAreaView className={"bg-primary h-full"}>
            <ScrollView className={"px-4 mb-0 h-full"}>
                <Text className={"text-white font-bold text-2xl"}>Upload video</Text>

                <FormField
                    otherStyles={"mt-4"}
                    label={"Video Title"}
                    value={form.video}
                    placeholder={"Give your video a catch title"}
                    onChange={(e) => setForm({...form, title: e})}
                />

                <View className={"mt-7 space-y-2"}>
                    <Text className="text-base text-green-100 font-medium">Upload video</Text>
                    <TouchableOpacity onPress={() =>openPicker('video')}>
                        {
                            form.video ? (
                                <Video useNativeControls={ResizeMode.COVER} resizeMode={'cover'}
                                       className={"w-full h-64 rounded-2xl"} source={{uri: form.video.uri}}/>
                            ) : (
                                <View className={"w-full h-40 bg-black-100 rounded-2xl justify-center items-center"}>
                                    <View
                                        className={"w-14 h-14 border border-dashed border-secondary justify-center items-center"}>
                                        <Image resizeMode={"contain"} source={icons.upload} className={"w-1/2 h-1/2"}/>
                                    </View>

                                </View>
                            )
                        }
                    </TouchableOpacity>

                </View>

                <View className={"mt-7 space-y-2"}>
                    <Text className="text-base text-green-100 font-medium">Upload Thumbnail</Text>
                    <TouchableOpacity onPress={() =>openPicker('image')}>
                        {
                            form.thumbnail ? (
                                <Image resizeMode={'cover'} className={"w-full h-64 rounded-2xl"}
                                       source={{uri: form.thumbnail.uri}}/>
                            ) : (
                                <View
                                    className={"flex-row w-full h-30 bg-black-100 rounded-2xl justify-center items-center"}>
                                    <Image resizeMode={"contain"} source={icons.upload}
                                           className={"py-10 h-6 w-6 mr-2"}/>
                                    <Text className={"  text-white text-lg"}>Choose file</Text>
                                </View>
                            )
                        }
                    </TouchableOpacity>

                </View>
                <FormField
                    otherStyles={"mt-4"}
                    label={"AI Prompt"}
                    value={form.video}
                    placeholder={"The video prompt"}
                    onChange={(e) => setForm({...form, prompt: e})}
                />

                <CustomButton
                    title={"Create video"}
                    containerStyle={"mt-4"}
                    handlePress={onSubmit}
                    isLoading={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create

