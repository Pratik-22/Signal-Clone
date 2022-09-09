import { StyleSheet, View } from 'react-native'
import React, { useState,useLayoutEffect } from 'react'
import { KeyboardAvoidingView , Alert } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: "Login"
      })
    }, [navigation])

    const register = () => {
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
        authUser.user.updateProfile({
            displayName: name,
            photoURL: imageUrl || 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn140.picsart.com%2F355899001011211.png%3Fto%3Dcrop%26type%3Dwebp%26r%3D310x310%26q%3D50&imgrefurl=https%3A%2F%2Fpicsart.com%2Fi%2Fsticker-355899001011211&tbnid=53Q9GNO0XQdV3M&vet=12ahUKEwiC-uH6g_75AhWCiOYKHRiwCfYQMygHegUIARDUAQ..i&docid=oaSa8pGvCM6jNM&w=310&h=310&q=default%20pfp&client=firefox-b-d&ved=2ahUKEwiC-uH6g_75AhWCiOYKHRiwCfYQMygHegUIARDUAQ'
        })
    })
    .catch((error)=>alert(error.message))

}
    
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom: 50 }}>Create a Signal Account</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full Name'
                    autofocus type='text'
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry type='text'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder='Profle Picture URL(optional)'
                    type='text'
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button
                containerStyle={styles.button}
                onPress={register}
                title='Register'
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff'
    },
    inputContainer: {
        width:300
    },
    button: {
        width:200,
        marginTop:10
    }

})