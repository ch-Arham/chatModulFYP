import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { StatusBar } from 'expo-status-bar';
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { TouchableOpacity } from 'react-native';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({navigation}) =>{

    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe;
    }, []);

//replace removes the back arrow and swipe and does it elsewise.
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Safe Citizens' Life",
            headerStyle: {backgroundColor: "#fff"},
            headerTitleStyle: {color: "black"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style= {{                   flexDirection: "row",
                justifyContent: "space-around",
                width: 80,
                marginLeft:20}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Avatar 
                            rounded
                            //title="AK"
                            source= {{uri: auth?.currentUser?.photoURL}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("ShowAllUsers")}
                    >
                        <AntDesign name="user" size={24} color="black"/>
                        
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: 80,
                    marginRight:20,
                }}>
                    <TouchableOpacity 
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("SendSMS")}
                    >
                        <SimpleLineIcons name="envelope-letter" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}
                    onPress={()=> navigation.navigate("Dial")}>
                        <AntDesign name="phone" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("AddChat")}
                    >
                        <SimpleLineIcons name="pencil" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
        ), 
        });
    },[navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat',{
            id,
            chatName,
        });
    }

    return(
        <SafeAreaView>
            <StatusBar style="light"/> 
            <ScrollView style={styles.container}>
                {chats.map(({id, data: { chatName }}) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles=StyleSheet.create({
    container: {
        height: "100%",
    }
});