import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from "../firebase";
import { Platform } from 'react-native';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);
//above is a listner

    const signIn = () =>{
        auth
        .signInWithEmailAndPassword(email.trim(), password)
        .catch((error) => alert(error));
    };

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.Container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            
                keyboardVerticalOffset={10}
        >
            <StatusBar style="light"/> 
            <Image 
                source={require('./sheild.jpg')}
                style={{width: 200, height: 200}}
            />
            
            <View style={styles.inputContainer}>
                <Input 
                placeholder='Email' 
                autofocus
                keyboardType='email-address'
                autoCapitalize = "none" 
                type='email' 
                value={email} 
                onChangeText={(text) => setEmail(text)}/>

                <Input placeholder='Password' secureTextEntry type='password' 
                value={password} onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn} autoCapitalize = "none"
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title='Login'/>
            <Button onPress={ () => navigation.navigate("Register")} containerStyle={styles.button} type="outline" title='register'/>
            <View style={{height:100}}></View>
        </KeyboardAvoidingView>
    );
}

export default LoginScreen

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: "white",
        padding: 10

    },
    inputContainer: {
        width: 300,
    },
    button:{
        width:200,
        marginTop:10
    }
});