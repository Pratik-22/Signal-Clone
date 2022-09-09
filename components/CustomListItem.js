import { StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../firebase';

export default function CustomListItem({id , chatName , enterChat}) {

    const[chatMessage,setChatMessage]=useState([]);

    useEffect(() => {
      const unsubscribe = db
      .collection('chats')
      .doc(id)
      .collection("messages")
      .orderBy("timestamp","desc")
      .onSnapshot((snapshot)=>
      setChatMessage(snapshot.docs.map((doc)=>doc.data())));
      return unsubscribe;

    })
    

    return (
        <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
            <Avatar
                rounded
                source={{
                    uri: "https://i.pinimg.com/236x/19/75/f9/1975f9c796d64db83e44a53d32bd93c5.jpg",
                }} />
                <ListItem.Content>
                    <ListItem.Title>
                        {chatName}
                    </ListItem.Title>
                    <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                        {chatMessage?.[0]?.displayName}:{chatMessage?.[0]?.message}
                    </ListItem.Subtitle>
                </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({}) 