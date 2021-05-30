import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Image, Text } from 'react-native-elements';
import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from "../firebase";
import { Platform } from 'react-native';

const RegisterScreen = ({navigation}) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle: "Back To Login",
        })
    }, [navigation] );

    const register = () => {
        auth
        .createUserWithEmailAndPassword(email.trim(), password) //this will return back what we will access with.then
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            })
        })
        .catch(error => alert(error.message))
    };
    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={10}>
        <StatusBar style="light"/> 
            <Text h3 style={{marginBottom: 50}}>Create Your Account</Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name" 
                    autoFocus 
                    type="text" 
                    value={name} 
                    onChangeText={text => setName(text)}

                />
                <Input 
                    placeholder="Email" 
                    type="email"
                    keyboardType='email-address'
                    autoCapitalize = "none" 
                    value={email}
                    onChangeText={email => setEmail(email)}

                />
                <Input 
                    placeholder="Password" 
                    type="password" 
                    autoCapitalize = "none"
                    secureTextEntry
                    value={password} 
                    onChangeText={text => setPassword(text)}

                />
                <Input 
                    placeholder="Profile Picture URL (Optional)" 
                    type="text" 
                    value={imageUrl} 
                    onChangeText={text => setImageUrl(text)}
                    onSubmitEditing={register}
                /> 
            </View>
            <Button containerStyle={styles.button} raised title="Register" onPress={register} />
            <View style={{height:100}}></View>
        </KeyboardAvoidingView>
    );
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       // backgroundColor: 'white',
        padding: 10,
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});