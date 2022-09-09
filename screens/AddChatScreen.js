import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase';


const AddChatScreen = ({navigation}) => {
    const[input,setInput]=useState('')

    useLayoutEffect(() => {

    }, [])

    const createChat=async()=>{
        await db.collection('chats').add(
            {
                chatName:input
            }
        )
        .then(()=>{
            navigation.goBack();
        })
        .catch((error)=>alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Input
             placeholder='Placeholder'
             value={input}
             onChangeText={(text)=>setInput(text)}
             leftIcon={<Ionicons name="chatbubbles" size={24} color="black" />}
             onSubmitEditing={createChat}
             />
             <Button onPress={createChat} title='Create New Chat'/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        padding:30,
        height:'100%'
    }
})