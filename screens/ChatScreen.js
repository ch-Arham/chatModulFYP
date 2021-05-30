import React, { useLayoutEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { db, auth } from "../firebase";
import firebase from 'firebase/app';

const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState(''); 
    const[messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Avatar 
                        rounded 
                        source={{
                            uri: messages[0]?.data.photoURL ||  
                            "https://homepages.cae.wisc.edu/~ece533/images/cat.png"}}/>
                    <Text 
                    style={{color: "white", 
                    marginLeft: 10, 
                    fontWeight: "700"
                    }}>
                    {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity 
                    style = {{marginLeft: 10}}
                    onPress = {navigation.goBack} 
                >
                    <AntDesign 
                    name="arrowleft" 
                    size={24} 
                    color="white"/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View 
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: 80,
                        marginRight: 20
                    }}>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation, messages]);

//Core of the app
    const sendMessgae = () => {
        Keyboard.dismiss();
        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })
        setInput(''); //this will clear the input
    }; 
//Core
    useLayoutEffect(() => {
        const unsubscribe = db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));
        return unsubscribe;
    }, [route]);

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: "White"}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <ScrollView contentContainerStyle={{paddingTop:15}}>
                        {messages.map(({id, data}) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.reciever}>
                                    <Avatar 
                                        source={{uri: data.photoURL}} 
                                        rounded 
                                        size={30} 
                                        position="absolute"
                                        bottom={-15}
                                        right={-5}
                                        // For it to work on WEB
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            right: -5,
                                        }}
                                    />
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                </View>
                            ): (
                                <View style={styles.sender}>
                                <Avatar 
                                        source={{uri: 
                                            data.photoURL
                                        }} 
                                        rounded 
                                        size={30} 
                                        position="absolute"
                                        bottom={-15}
                                        right={-5}
                                        // For it to work on WEB
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            right: -5,
                                        }}
                                />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                            placeholder="Safe Citizens' Life Chat" 
                            style={styles.TextInput}
                            value={input} 
                            onChangeText={(text => setInput(text))}
                            onSubmitEditing={sendMessgae}
                            //autoFocus
                        />
                        <TouchableOpacity onPress={sendMessgae} activeOpacity={0.5}>
                            <Ionicons name="send" size={24} color="#2B68E6"/>
                        </TouchableOpacity>
                    </View>
                </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
        </SafeAreaView>
        //Safe Area View takes care if the edges are rounded <Text>{route.params.chatName}</Text>|| <> </> fragment tag
    )
}
{/* sender and reciever are missed up, ulta hai asal main*/}
export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginLeft: 20,
        marginBottom: 13,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    TextInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        //borderColor: "transparent",
        backgroundColor: "#ECECEC",
        //borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
});