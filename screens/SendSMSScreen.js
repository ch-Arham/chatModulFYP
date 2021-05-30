import React, {useState, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput,} from 'react-native';
import * as SMS from 'expo-sms';

const SendSMSScreen = ({navigation}) => {
    let [inputValue, setInputValue] = useState('');
    let [inputValueM, setInputValueM] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Send SMS",
            headerBackTitle: "Chats",
        })
    },[navigation]);

    const sendM = async () => {

        if (inputValueM.length != 11) {
            alert('Please insert correct contact number');
            return;
          }
          console.log(inputValue);
          console.log(inputValueM);
        const status = await SMS.sendSMSAsync(
          inputValueM, 
          inputValue
        );
        
        console.log(status);
      };
    
      
        return (
            <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              <Text style={styles.titleTextsmall}>
                Enter Mobile Number
              </Text>
              <TextInput
                value={inputValueM}
                onChangeText={
                  (inputValueM) => setInputValueM(inputValueM)
                }
                placeholder={'Enter Contact Number to Call'}
                keyboardType="numeric"
                style={styles.textInput}
              />
              <Text style={styles.titleTextsmall}>
                Text Message Message
              </Text>
              <TextInput
                value={inputValue}
                onChangeText={
                  (inputValue) => setInputValue(inputValue)
                }
                placeholder={'Write Text'}
                style={styles.textInput}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={sendM}>
                <Text style={styles.buttonTextStyle}>
                  Send SMS
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      
  
}

export default SendSMSScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30,
      },
      titleText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      titleTextsmall: {
        marginVertical: 8,
        fontSize: 16,
      },
      buttonStyle: {
          justifyContent: 'center',
          marginTop: 15,
          padding: 15,
          backgroundColor: '#2089dc',
          borderRadius: 3,
      },
      buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
      },
      textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
      },
});
