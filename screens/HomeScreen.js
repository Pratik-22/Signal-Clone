import { View, Text } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { TouchableOpacity , StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(
      () => {
        navigation.replace("Login")
      }
    );
  };

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, [])

  const enterChat=(id, chatName)=>{
    navigation.navigate('Chat',{
      id,
      chatName
    })
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: {
        color: 'black'
      },
      headerLeft: () => (<View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={signOutUser}>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </TouchableOpacity>
      </View>),
      headerRight: () => (<View style={{ flexDirection: 'row', width: 80, justifyContent: 'space-between', marginRight: 20 }}>
        <TouchableOpacity>
          <AntDesign name="camerao" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
          <SimpleLineIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>),
    })
  }, [])

  return (
    <SafeAreaView >
      <ScrollView style={styles.container}>
        {chats.map(({id,data:{ chatName }})=>(
         <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        )
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    height:'100%',
  }
})