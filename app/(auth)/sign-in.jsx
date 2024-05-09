import {ScrollView, Text, View, Image, Alert} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import FormField from "../../components/FormField";
import React, {useState} from 'react'
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import {signIn} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false)
    const {setUser, setIsLoggedIn} = useGlobalContext();


    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert("Error", "Please fill all fields")
            return
        }
        try {
            setIsSubmitting(true)
            const user = await signIn(form.email, form.password)
            setUser(user)
            setIsLoggedIn(true)
            Alert.alert("Success", "Logged in successfully")
            router.replace('/Home')
        }catch (e) {
            Alert.alert("Error", e.message)
        }finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full px-3">
            <ScrollView c>
                <View className="w-full min-h-[85vh] justify-center px-4 my-6">
                    <Image source={images.logo}
                           resizeMode="contain"
                           className="w-[111px] h-[35px]"

                    />
                    <Text className="mt-10 text-2xl font-bold text-white">Log in to Cauris</Text>

                    <FormField
                        label="Email"
                        placeholder="Enter your email"
                        type="text"
                        value={form.email}
                        onChange={(email) => setForm({...form, email })}
                        otherStyles="mt-6"
                        keyboardType="email-address"
                    />

                    <FormField
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={form.password}
                        onChange={(password) => setForm({...form, password})}
                        otherStyles="mt-6 mb-6"
                        keyboardType="default"
                    />

                    <CustomButton
                        title={"Sign In"}
                        otherStyles={"mt-6"}
                        handlePress={submit}
                        isLoading={isSubmitting}
                    />

                    <View className={"flex-row justify-center mt-6"}>
                        <Text className="text-white">Don't have account ? </Text>
                        <Link href={"/sign-up"} className="text-secondary text-center">Sign Up</Link>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn
