import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { db, auth } from '../firebase';
import * as firebase from 'firebase';


const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chats",
            headerTitleAlign: 'Left',
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar rounded
                        source={
                            {
                                uri: 'https://i.pinimg.com/736x/f9/83/18/f98318a9e1266c62d984d9ffb462cf05.jpg'
                            }
                        }
                    />
                    <Text style={{ marginLeft: 10, fontWeight: '700', color: '#fff' }}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (<View style={{ marginLeft: 20 }}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            </View>),
            headerRight: () => (
                <View
                    style={{ flexDirection: 'row', marginRight: 10, justifyContent: 'space-between', width: 80 }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.default.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })
        setInput('')
    }
    useLayoutEffect(() => {
        const unsubscribe  = db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=> setMessages(
            snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })

            )
        ));
        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <StatusBar style='light' />
            <KeyboardAvoidingView keyboardVerticalOffset={90} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{padding:15}}>
                            {messages.map(({id,data})=>(
                                data.email === auth.currentUser.email ?
                                (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                        position='absolute'
                                        bottom={-15}
                                        right={-5}
                                        rounded
                                        size={30}
                                        
                                            source={{uri: data.photoURL}}/>
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ):
                                (
                                    <View style={styles.sender}> 
                                        <Avatar
                                        position='absolute'
                                        bottom={-15}
                                        left={-5}
                                        rounded
                                        size={30}
                                        
                                            source={{uri: data.photoURL}}/>
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>

                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                style={styles.textinput}
                                placeholder='Signal Message'
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity onPress={sendMessage}>
                                <Ionicons name="send" size={24} color="#2C6EBD" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textinput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        borderWidth: 1,
        borderColor: 'rgba(158, 150, 150, .5)',
        padding: 10,
        color: 'gray',
        borderRadius: 30
    },
    reciever:{
        padding:15,
        backgroundColor:'#ECECEC',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    },
    sender:{
        padding:15,
        backgroundColor:'#2B68E6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative'
    },
    senderName:{
        left:10,
        paddingRight:10,
        color:'#fff'
    },
    senderText:{
        color:'#fff',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:15
    },

})