import {ScrollView, Text, View, Image, Alert} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import FormField from "../../components/FormField";
import React, {useState} from 'react'
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import {createUser} from "../../lib/appwrite";

const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.email || !form.password || !form.name) {
            Alert.alert("Error", "Please fill all fields")
            return
        }
        try {
            setIsSubmitting(true)
            await createUser(form.email, form.password, form.name)
            Alert.alert("Success", "Account created successfully")
            router.push('/home')
        } catch (e) {
            Alert.alert("Error", e.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full px-3">
            <ScrollView>
                <View className="w-full min-h-[85vh] justify-center px-4 my-6">
                    <Image source={images.logo}
                           resizeMode="contain"
                           className="w-[111px] h-[35px]"

                    />
                    <Text className="mt-10 text-2xl font-bold text-white">Sign Up in Cauris</Text>

                    <FormField
                        label="Name"
                        placeholder="Enter your name"
                        type="text"
                        value={form.name}
                        onChange={(name) => setForm({...form, name})}
                        otherStyles="mt-6"
                        keyboardType="default"
                    />

                    <FormField
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        value={form.email}
                        onChange={(email) => setForm({...form, email})}
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
                        title={"Sign Up"}
                        otherStyles={"mt-5"}
                        handlePress={submit}
                        isLoading={isSubmitting}
                    />

                    <View className={"flex-row justify-center mt-7"}>
                        <Text className="text-white">Already have an account? </Text>
                        <Link href={"/sign-in"} className="text-secondary text-center">Sign In</Link>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp
